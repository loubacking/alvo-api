import 'dotenv/config'
import express, { Router } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { MongoHelper } from './infra/db/mongoHelper';
import { configSongsRoutes } from './presentation/routes/songsRoutes';
import { configArtistsRoutes } from './presentation/routes/artistsRoutes';
import { configAuthRoutes } from './presentation/routes/authRoutes';
  
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log('Time:', Date.now().toLocaleString());
    next();
  });
  
app.get('/status', (req, res) => res.sendStatus(200));

const router = Router();
configSongsRoutes(router);
configArtistsRoutes(router);
configAuthRoutes(router);

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
  