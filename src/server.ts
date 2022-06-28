import 'dotenv/config'
import express from 'express';
import { MongoHelper } from './infra/db/mongoHelper';
import { setupMiddlewares } from './presentation/middlewares';
import { setupRoutes } from './presentation/routes';
  
const app = express();

setupMiddlewares(app);
setupRoutes(app);

const port = process.env.PORT || 3080;

const mongoUri = process.env.MONGO_DB;
MongoHelper.connect(mongoUri)
  .then(() => {
    
    app.listen(port, () => {
      console.info(`App listening on port ${port}`);
    });
  })
  .catch(console.error);
  