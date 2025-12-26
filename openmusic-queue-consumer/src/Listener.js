class Listener {
  constructor(consumerService, mailSender) {
    this._consumerService = consumerService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._consumerService.getPlaylist(playlistId);
      const songs = await this._consumerService.getSongsFromPlaylist(playlistId);

      const result = {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          songs,
        },
      };

      const resultString = JSON.stringify(result);
      await this._mailSender.sendEmail(targetEmail, resultString);

      console.log(`Email terkirim ke ${targetEmail}`);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
