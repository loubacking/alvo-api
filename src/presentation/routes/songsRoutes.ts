import { Router } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";
import { SongsController } from "../controllers/songsController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { validateCreateSongRequestAsync, validateSongIdOnRequestAsync } from "../middlewares/validators/songsValidator";

const songsRepository = new SongsRepository();
const artistRepository = new ArtistsRepository();
const controller = new SongsController(songsRepository, artistRepository);

export const configSongsRoutes = (router: Router) => {
  router.get('/songs', (req, res) => {
    // #swagger.tags = ['Songs']
    // #swagger.description = 'Get a list of songs'

    controller.getSongs(req, res);
  });

  router.get('/searchSong', (req, res) => {
    // #swagger.tags = ['Songs']
    // #swagger.description = 'Search songs that matches keyword'
    /* #swagger.parameters['keyword'] = {
      in: 'query',
      required: 'true'
    } */

    controller.searchSong(req, res);
  });

  router.get('/songs/:id', validateSongIdOnRequestAsync, (req, res) => {
    // #swagger.tags = ['Songs']
    // #swagger.description = 'Search songs that matches keyword'
    /* #swagger.parameters['id'] = {
      required: 'true'
    } */

    controller.getSongById(req, res);
  });

  router.post('/songs', isAuthenticated, validateCreateSongRequestAsync, (req, res) => {
    // #swagger.tags = ['Songs']
    // #swagger.description = 'Create new song'
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $artistId: 'artistId',
        $name: 'What is the brother',
        $lyrics: {},
        $chords: {}
      }
    } */

    controller.createSong(req, res);
  });
}
