import { Request, Response } from "express";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";

export class SongsController {
  private readonly songsRepository: SongsRepository;

  constructor(songsRepository: SongsRepository) {
    this.songsRepository = songsRepository;
  }

  getSongs = async (req: Request, res: Response) => {
    const songs = await this.songsRepository.getAll();

    return res.json(songs);
  };

  getSongById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const song = await this.songsRepository.getById(id);

    return res.json(song);
  };

  searchSong = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const name = new RegExp(keyword as string, "i");

    const songs = await this.songsRepository.search(name);
    return res.json(songs);
}
}
