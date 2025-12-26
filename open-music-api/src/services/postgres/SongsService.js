const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToSongModel } = require('../../utils/mapDBToModel');

class SongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    if (albumId) {
      await this._cacheService.delete(`albums:${albumId}`);
    }

    return result.rows[0].id;
  }

  async getAllSongs({ title, performer }) {
    const query = {
      text: 'SELECT * FROM songs',
      values: [],
    };

    if (title && performer) {
      query.text += ' WHERE LOWER(title) LIKE $1 AND LOWER(performer) LIKE $2';
      query.values.push(`%${title.toLowerCase()}%`, `%${performer.toLowerCase()}%`);
    } else if (title) {
      query.text += ' WHERE LOWER(title) LIKE $1';
      query.values.push(`%${title.toLowerCase()}%`);
    } else if (performer) {
      query.text += ' WHERE LOWER(performer) LIKE $1';
      query.values.push(`%${performer.toLowerCase()}%`);
    }

    const result = await this._pool.query(query);
    return result.rows.map(mapDBToSongModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows[0];
  }

  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal diperbarui. Id tidak ditemukan');
    }

    if (albumId) {
      await this._cacheService.delete(`albums:${albumId}`);
    }
  }

  async deleteSongById(id) {
    const queryFind = {
      text: 'SELECT album_id FROM songs WHERE id = $1',
      values: [id],
    };
    const resultFind = await this._pool.query(queryFind);

    const albumId = resultFind.rows.length ? resultFind.rows[0].album_id : null;

    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    if (albumId) {
      await this._cacheService.delete(`albums:${albumId}`);
    }
  }
}

module.exports = SongsService;