import { Request, Response } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";

export class SongsController {
  private readonly songsRepository: SongsRepository;
  private readonly artistsRepository: ArtistsRepository;

  constructor(songsRepository: SongsRepository, artistsRepository: ArtistsRepository) {
    this.songsRepository = songsRepository;
    this.artistsRepository = artistsRepository;
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

    const songs = await this.songsRepository.search(keyword as string);
    return res.json(songs);
  };

  createSong = async (req: Request, res: Response) => {
    const { artistId, name, lyrics, chords } = req.body;
    const artist = await this.artistsRepository.getById(artistId);
    console.log(artist);
    if(artist === null){
      return res.status(400).json({ error: `There is no artist with id '${artistId}'`});
    }
    const songId = await this.songsRepository.create({ artistId: artist.id, name, lyrics, chords });

    return res.json({ id: songId });
  }
}
