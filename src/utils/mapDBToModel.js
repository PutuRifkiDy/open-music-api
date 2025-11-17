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

module.exports = {  mapDBToSongModel, mapDBToAlbumModel };