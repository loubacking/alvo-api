import { Router } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";
import { ArtistsController } from "../controllers/artistsController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const artistsRepository = new ArtistsRepository();
const songsRepository = new SongsRepository();
const controller = new ArtistsController(artistsRepository, songsRepository);

export const configArtistsRoutes = (router: Router) => {
  router.get('/artists', controller.getArtists);
  router.get('/artists/:id', controller.getArtistById);
  router.get('/artists/:id/songs', controller.getArtistSongs);
  router.get('/searchArtist', controller.searchArtist);

  router.post('/artists', isAuthenticated, controller.createArtist);

  router.put('/artists', isAuthenticated, controller.editArtist);

}
