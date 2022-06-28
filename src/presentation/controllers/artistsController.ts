import { Request, Response } from "express";
import { ArtistsRepository } from "../../infra/db/repositories/artistsRepository";
import { SongsRepository } from "../../infra/db/repositories/songsRepository";

export class ArtistsController {
  private readonly artistsRepository: ArtistsRepository;
  private readonly songsRepository: SongsRepository;

  constructor(artistsRepository: ArtistsRepository, songsRepository: SongsRepository) {
    this.artistsRepository = artistsRepository;
    this.songsRepository = songsRepository;
  }

  getArtists = async (req: Request, res: Response) => {
    const artists = await this.artistsRepository.getAll();

    return res.json(artists);
  };

  getArtistById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const artist = await this.artistsRepository.getById(id);

    return res.json(artist);
  };
  
  searchArtist = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    const name = new RegExp(keyword as string, "i");

    const artist = await this.artistsRepository.search(name);
    return res.json(artist);
  }

  getArtistSongs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const songs = await this.songsRepository.getByArtistId(id);

    return res.json(songs);
  }

  createArtist = async (req: Request, res: Response) => {
    const { name, imageUrl } = req.body;
    const artistId = await this.artistsRepository.create(name, imageUrl);

    return res.json({ id: artistId });
  }
}
