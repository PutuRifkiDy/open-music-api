exports.up = (pgm) => {
  pgm.createTable('album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    }
  });

  pgm.addConstraint('album_likes', 'unique_album_user', 'UNIQUE(album_id, user_id)');
  pgm.addConstraint('album_likes', 'fk_album_likes.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
  pgm.addConstraint('album_likes', 'fk_album_likes.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('album_likes', 'unique_album_user');
  pgm.dropConstraint('album_likes', 'fk_album_likes.album_id_albums.id');
  pgm.dropConstraint('album_likes', 'fk_album_likes.user_id_users.id');
  pgm.dropTable('album_likes');
};
