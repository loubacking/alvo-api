import { Router } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";
import { SongsController } from "../controllers/songsController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const songsRepository = new SongsRepository();
const artistRepository = new ArtistsRepository();
const controller = new SongsController(songsRepository, artistRepository);

export const configSongsRoutes = (router: Router) => {
  router.get('/songs', controller.getSongs);
  router.get('/searchSong', controller.searchSong);
  router.get('/songs/:id', controller.getSongById);

  router.post('/songs', isAuthenticated, controller.createSong);
}
