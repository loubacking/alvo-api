import { Request, Response } from "express";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";

export class SongsController {
  private readonly songsRepository: SongsRepository;

  constructor(songsRepository: SongsRepository) {
    this.songsRepository = songsRepository;
  }

  getSongs = async (req: Request, res: Response) => {
    let songs = await this.songsRepository.getAll();

    return res.json(songs);
  };
}
