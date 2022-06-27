import 'dotenv/config'
import express, { Router } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
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
  showArtists, 
} from './application';
import { MongoHelper } from './infra/db/mongoHelper';
import { route } from './presentation/routes/songsRoutes';
  
const app = express();
app.use(cors());

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

const router = Router();
route(router)
app.get('/songs/:id', getSong);

app.post('/artists', isAuthenticated, createArtist);
app.post('/songs', isAuthenticated, createSong);
app.post('/auth', authenticate)

app.put('/artists', isAuthenticated, editArtist);


app.use(router);

const port = process.env.PORT || 3080;

const mongoUri = process.env.MONGO_DB;
MongoHelper.connect(mongoUri)
.then(() => {
  
  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
})
.catch(console.error);
  