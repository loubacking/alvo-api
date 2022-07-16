import { Application, Router } from "express";
import { configArtistsRoutes } from "./artistsRoutes";
import { configAuthRoutes } from "./authRoutes";
import { configSongsRoutes } from "./songsRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../config/swagger_output.json';

export const setupRoutes = (app: Application) => {
  app.get('/status', (_, res) => res.sendStatus(200));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  const router = Router();
  configSongsRoutes(router);
  configArtistsRoutes(router);
  configAuthRoutes(router);

  app.use(router);
}