const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { playlistSongsService, collaborationsService, usersService, validator }) => {
    const collaborationsHandler = new CollaborationsHandler(playlistSongsService, collaborationsService, usersService, validator);
    server.route(routes(collaborationsHandler));
  }
};