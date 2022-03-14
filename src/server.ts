import 'dotenv/config'
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { 
  authenticate, 
  createArtist, 
  createSong, 
  editArtist, 
  getArtist, 
  getArtistSongs, 
  getSong, 
  isAuthenticated, 
  searchArtist, 
  searchSong, 
  showArtists, 
  showSongs 
} from './routes';
  
const log = require('simple-node-logger').createSimpleLogger();

const app = express();
app.use(cors());

export const uri = process.env.MONGO_DB;
mongoose.connect(uri).then(() => console.log('MongoDb connected'));
export const connection = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log('Time:', Date.now().toLocaleString());
    next();
  });

app.get('/status', (req, res) => res.sendStatus(200));

app.get('/artists', showArtists);
app.get('/artists/:id', getArtist);
app.get('/artists/:id/songs', getArtistSongs);
app.get('/searchArtist', searchArtist);

app.get('/songs', showSongs);
app.get('/songs/:id', getSong);
app.get('/searchSong', searchSong);

app.post('/artists', isAuthenticated, createArtist);
app.post('/songs', isAuthenticated, createSong);
app.post('/auth', authenticate)

app.put('/artists', isAuthenticated, editArtist);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  log.info(`App listening on port ${port}`);
});