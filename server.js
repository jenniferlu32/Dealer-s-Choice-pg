const express = require('express');
const app = express();
const { syncAndSeed } = require('./db');

const router = require('./routes/routes');
app.use('/albums', router)


const startApp = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch(err) {
    console.log(err);
  }
};

startApp();
