const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { nanoid } = require('nanoid');

class AlbumLikesService {
  constructor(albumsService, cacheService) {
    this._pool = new Pool();
    this._albumsService = albumsService;
    this._cacheService = cacheService;
  }

  async addAlbumLike(userId, albumId) {
    await this._albumsService.getAlbumById(albumId);

    const queryCheckLike = {
      text: 'SELECT id FROM album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const resultCheckLike = await this._pool.query(queryCheckLike);

    if (resultCheckLike.rows.length > 0) {
      throw new InvariantError('Anda sudah menyukai album ini');
    }

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO album_likes VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, albumId, userId, createdAt, updatedAt],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menyukai album');
    }

    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Gagal membatalkan menyukai album');
    }

    await this._cacheService.delete(`album-likes:${albumId}`);
  }

  async getCountAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album-likes:${albumId}`);

      return {
        likes: JSON.parse(result),
        isCache: true,
      };
    } catch {
      const query = {
        text: 'SELECT count(id) FROM album_likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);
      const likes = parseInt(result.rows[0].count, 10);

      await this._cacheService.set(`album-likes:${albumId}`, JSON.stringify(likes));

      return {
        likes,
        isCache: false,
      };
    }
  }
}

module.exports = AlbumLikesService;