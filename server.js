require('dotenv').config();
const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
var moment = require('moment');

app.use(cors());

const Routes = require('./routes');
const uri = process.env.MONGO_DB;
global.db = mongoose.createConnection(uri, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log('Time:', moment().format());
    next();
  });

app.get('/status', (req, res) => res.sendStatus(200));

app.get('/artists', Routes.showArtists);
app.get('/artists/:id', Routes.getArtist);
app.get('/artists/:id/songs', Routes.getArtistSongs);
app.get('/searchArtist', Routes.searchArtist);

app.get('/songs', Routes.showSongs);
app.get('/songs/:id', Routes.getSong);
app.get('/searchSong', Routes.searchSong);

app.post('/artists', Routes.isAuthenticated, Routes.createArtist);
app.post('/songs', Routes.isAuthenticated, Routes.createSong);
app.post('/auth', Routes.authenticate)

app.put('/artists', Routes.isAuthenticated, Routes.editArtist);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});

module.exports = { app };
