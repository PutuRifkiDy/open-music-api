class AlbumLikesHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.deleteAlbumLikeHandler = this.deleteAlbumLikeHandler.bind(this);
    this.getCountAlbumLikesHandler = this.getCountAlbumLikesHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.addAlbumLike(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });
    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteAlbumLike(credentialId, id);

    const response = h.response({
      status: 'success',
      message: 'Berhasil membatalkan menyukai album',
    });
    response.code(200);
    return response;
  }

  async getCountAlbumLikesHandler(request, h) {
    const { id } = request.params;

    const { likes, isCache } = await this._service.getCountAlbumLikes(id);
    const response = h.response({
      status: 'success',
      data: {
        likes,
      },
    });

    if (isCache) {
      response.header('X-Data-Source', 'cache');
    }

    response.code(200);
    return response;
  }
}

module.exports = AlbumLikesHandler;