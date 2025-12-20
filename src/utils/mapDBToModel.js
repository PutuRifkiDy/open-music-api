const mapDBToSongModel = ({
  id,
  title,
  performer
}) => ({
  id,
  title,
  performer
});

const mapDBToAlbumModel = ({
  id,
  name,
  year
}) => ({
  id,
  name,
  year
});

const mapDBToPlaylistModel = ({
  id,
  name,
  createdAt,
  updatedAt,
  username
}) => ({
  id,
  name,
  createdAt,
  updatedAt,
  username
});

module.exports = {  mapDBToSongModel, mapDBToAlbumModel, mapDBToPlaylistModel };