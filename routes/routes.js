const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const albums = await db.query(`SELECT * FROM albums;`);
    const albumsData = albums.rows;
    res.send(`
    <html>
      <head><h2>Kanye West Albums</h2></head>
      <body>
        <ul>
          ${
            albumsData.map(album => `<li><a href='/albums/${album.albumid}'>${album.title}</a></li>`).join('')
          }
        </ul>
      </body>
    </html>
    `)
  }
  catch(err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const songs = await db.query(`SELECT * FROM songs WHERE albumid = $1;`, [req.params.id]);
    const songsData = songs.rows;
    res.send(`
    <html>
      <head><h2>Songs</h2></head>
      <body>
        <a href='/albums'>Back</a>
        <ul>
          ${
            songsData.map(song => `<li>${song.title}</li>`).join('')
          }
        </ul>
      </body>
    </html>
    `)
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
