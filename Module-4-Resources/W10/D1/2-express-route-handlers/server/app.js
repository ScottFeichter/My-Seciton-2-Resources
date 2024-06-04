// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();
app.use(express.json());
app.use((req, res,  next) => {
  console.log('Request Body:', req.body);
  next();
});

// Your code here

app.get('/artists', (res, req) => {
  const artists = getAllArtists();
  console.log(artists);
  res.json(artists);
});

app.post('/artists', (res, req)=> {
  const artist = req.body.name;
  console.log(artist);

  const addedArtist = addArtist(artist);

  res.statusCode(201);
  res.json(addArtist);
});




// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
