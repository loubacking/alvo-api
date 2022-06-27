import { MongoHelper } from "../mongoHelper"

export type Song = {
  artistName: string,
  createdAt: string,
  artistId: string,
  name: string,
  lyrics: string,
  chords: string
}

export class SongsRepository {
  getAll = async (): Promise<Song[]> => {
    let songsCollection = await MongoHelper.getCollection('song');

    return songsCollection
      .find({})
      .toArray();
  }

  search = async (name: RegExp): Promise<Song[]> => {
    let songsCollection = await MongoHelper.getCollection('song');

    return songsCollection
      .find({ name })
      .toArray();
  }
}