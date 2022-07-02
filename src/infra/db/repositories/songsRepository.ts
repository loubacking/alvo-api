import { Types } from "mongoose";
import { MongoHelper } from "../mongoHelper"

export type Song = {
  artistName: string,
  createdAt: string,
  artistId: string,
  name: string,
  lyrics: string,
  chords: string
}

export type CreateSongRequest = {
  artistId: string, 
  artistName: string, 
  name: string, 
  lyrics: string, 
  chords: string
}

export class SongsRepository {
  create = async (req: CreateSongRequest): Promise<string> => {
    let songsCollection = await MongoHelper.getCollection('song');
    var response = await songsCollection.insertOne({ ...req, createdAt: Date.now().toLocaleString() });

    return response.insertedId;
  }

  getAll = async (): Promise<Song[]> => {
    let songsCollection = await MongoHelper.getCollection('song');

    return songsCollection
      .find({})
      .toArray();
  }

  getById = async (id: string): Promise<Song[] | {}> => {
    try {
      let songsCollection = await MongoHelper.getCollection('song');
      
      return songsCollection
        .findOne({ _id: new Types.ObjectId(id) });
      
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  search = async (name: RegExp): Promise<Song[]> => {
    let songsCollection = await MongoHelper.getCollection('song');

    return songsCollection
      .find({ name })
      .toArray();
  }

  
  getByArtistId = async (artistId: string): Promise<Song[] | {}> => {
    try {
      let songsCollection = await MongoHelper.getCollection('song');
      
      return songsCollection
        .find({ artistId })
        .toArray();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}