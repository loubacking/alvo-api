import { Router } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";
import { ArtistsController } from "../controllers/artistsController";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { validateArtistIdOnRequestAsync, validateCreateArtistRequestAsync, validateEditArtistRequestAsync } from "../middlewares/validators/artistsValidator";

const artistsRepository = new ArtistsRepository();
const songsRepository = new SongsRepository();
const controller = new ArtistsController(artistsRepository, songsRepository);

export const configArtistsRoutes = (router: Router) => {
  router.get('/artists', (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Get a list of artists'

    controller.getArtists(req, res);
  });

  router.get('/artists/:id', validateArtistIdOnRequestAsync, (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Get artist with id provided'
    /* #swagger.parameters['id'] = {
      required: 'true'
    } */
    controller.getArtistById(req, res);
  });

  router.get('/artists/:id/songs', validateArtistIdOnRequestAsync,  (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Get songs from the provided artist'
    /* #swagger.parameters['id'] = {
      required: 'true'
    } */

    controller.getArtistSongs(req, res);
  });

  router.get('/searchArtist', (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Search artists that matches keyword'
    /* #swagger.parameters['keyword'] = {
      in: 'query',
      required: 'true'
    } */

    controller.searchArtist(req, res);
  });

  router.post('/artists', isAuthenticated, validateCreateArtistRequestAsync, (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Create new artist'
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $name: 'Ednaldo Pereira',
        $imageUrl: 'image_link',
      }
    } */
    /* #swagger.security = [{
      "Auth": []
    }] */

    controller.createArtist(req, res);
  });

  router.put('/artists', isAuthenticated, validateEditArtistRequestAsync, (req, res) => {
    // #swagger.tags = ['Artists']
    // #swagger.description = 'Edit artist data'
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $id: 'artistId',
        name: 'Ednaldo Pereira',
        imageUrl: 'image_link',
      }
    } */
    /* #swagger.security = [{
      "Auth": []
    }] */

    controller.editArtist(req, res);
  });

}
