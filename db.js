const pg = require('pg')

const postgresUrl = 'postgress://localhost/albums';
const db = new pg.Client(postgresUrl) //creates database

const syncAndSeed = async() => {
  try {
    await db.connect();

    await db.query(`
    DROP TABLE IF EXISTS songs;
    DROP TABLE IF EXISTS albums;
    `);

    await db.query(`
    CREATE TABLE albums (
      albumId SERIAL PRIMARY KEY,
      title VARCHAR(100)
    );`)

    await db.query(`
    INSERT INTO albums (title) VALUES ('808s & Heartbreak');
    INSERT INTO albums (title) VALUES ('My Beautiful Dark Twisted Fantasy');
    INSERT INTO albums (title) VALUES ('Yeezus');
    `)

    await db.query(`

    CREATE TABLE songs (
      songId SERIAL PRIMARY KEY,
      title VARCHAR(100),
      albumId INTEGER REFERENCES albums(albumid)
    );

    INSERT INTO songs (title, albumId) VALUES ('Say You Will', 1);
    INSERT INTO songs (title, albumId) VALUES ('Welcome to Heartbreak', 1);
    INSERT INTO songs (title, albumId) VALUES ('Heartless', 1);
    INSERT INTO songs (title, albumId) VALUES ('Amazing', 1);
    INSERT INTO songs (title, albumId) VALUES ('All Of The Lights', 1);
    INSERT INTO songs (title, albumId) VALUES ('On Sight', 2);
    INSERT INTO songs (title, albumId) VALUES ('Monster', 2);
    INSERT INTO songs (title, albumId) VALUES ('Georgeous', 2);
    INSERT INTO songs (title, albumId) VALUES ('POWER', 2);
    INSERT INTO songs (title, albumId) VALUES ('Dark Fanatasy', 2);
    INSERT INTO songs (title, albumId) VALUES ('Black Skinhead', 3);
    INSERT INTO songs (title, albumId) VALUES ('I Am A God', 3);
    INSERT INTO songs (title, albumId) VALUES ('New Slaves', 3);
    INSERT INTO songs (title, albumId) VALUES ('Hold My Liquor', 3);
    INSERT INTO songs (title, albumId) VALUES ('On Sight', 3);
    `);

  } catch(err) {
    console.log(err);
  };
};

module.exports = {
  syncAndSeed,
  db
}
