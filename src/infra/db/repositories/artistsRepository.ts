import { Types } from "mongoose";
import { MongoHelper } from "../mongoHelper"

export type Artist = {
  _id: string,
  createdAt: string,
  name: string,
  image: string
}

export class ArtistsRepository {
  create = async (name: string, imageUrl: string): Promise<string> => {
    let artistsCollection = await MongoHelper.getCollection('artist');
    const artist = await artistsCollection.insertOne({ name, imageUrl, createdAt: Date.now().toLocaleString()});

    return artist.insertedId;
  }

  getAll = async (): Promise<Artist[]> => {
    let artistsCollection = await MongoHelper.getCollection('artist');

    return artistsCollection
      .find({})
      .toArray();
  }

  getById = async (id: string): Promise<Artist | null> => {
    try {
      let artistsCollection = await MongoHelper.getCollection('artist');
      
      return artistsCollection
        .findOne({ _id: new Types.ObjectId(id) });
      
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  search = async (name: RegExp): Promise<Artist[]> => {
    let artistsCollection = await MongoHelper.getCollection('artist');

    return artistsCollection
      .find({ name })
      .toArray();
  }
}