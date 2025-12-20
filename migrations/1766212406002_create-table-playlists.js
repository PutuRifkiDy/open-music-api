exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    createdAt: {
      type: 'TEXT',
      notNull: true,
    },
    updatedAt: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');

  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');
};
