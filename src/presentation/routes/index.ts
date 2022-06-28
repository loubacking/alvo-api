import { Application, Router } from "express";
import { configArtistsRoutes } from "./artistsRoutes";
import { configAuthRoutes } from "./authRoutes";
import { configSongsRoutes } from "./songsRoutes";

export const setupRoutes = (app: Application) => {
  app.get('/status', (_, res) => res.sendStatus(200));

  const router = Router();
  configSongsRoutes(router);
  configArtistsRoutes(router);
  configAuthRoutes(router);

  app.use(router);
}