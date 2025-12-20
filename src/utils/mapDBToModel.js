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
  username
}) => ({
  id,
  name,
  username
});

module.exports = { mapDBToSongModel, mapDBToAlbumModel, mapDBToPlaylistModel };