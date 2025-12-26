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
  year,
  cover_url
}) => ({
  id,
  name,
  year,
  coverUrl: cover_url
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