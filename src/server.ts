import 'dotenv/config'
import express from 'express';
import { setupMiddlewares } from './presentation/middlewares';
import { setupRoutes } from './presentation/routes';

const app = express();

setupMiddlewares(app);
setupRoutes(app);

const port = process.env.PORT || 3080;

app.listen(port, () => {
  console.info(`App listening on port ${port}`);
});
