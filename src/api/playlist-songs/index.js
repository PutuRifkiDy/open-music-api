const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist-songs',
  version: '1.0.0',
  register: async (server, { playlistSongsService, playlistsService, songsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(playlistSongsService, playlistsService, songsService, validator);
    server.route(routes(playlistSongsHandler));
  }
};