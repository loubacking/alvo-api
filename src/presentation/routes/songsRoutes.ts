import { Router } from "express";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";
import { SongsController } from "../controllers/songsController";

let repository = new SongsRepository();
let controller = new SongsController(repository);

export const route = (router: Router) => {
  router.get('/songs', controller.getSongs);
  router.get('/searchSong', controller.searchSong);

}
