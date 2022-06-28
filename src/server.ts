import 'dotenv/config'
import express, { Router } from 'express';
import { MongoHelper } from './infra/db/mongoHelper';
import { configSongsRoutes } from './presentation/routes/songsRoutes';
import { configArtistsRoutes } from './presentation/routes/artistsRoutes';
import { configAuthRoutes } from './presentation/routes/authRoutes';
import { setupMiddlewares } from './presentation/middlewares';
  
const app = express();

setupMiddlewares(app);

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
  