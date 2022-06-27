import { Types } from "mongoose";
import { MongoHelper } from "../mongoHelper"

export type Artist = {
  createdAt: string,
  name: string,
  image: string
}

export class ArtistsRepository {
  getAll = async (): Promise<Artist[]> => {
    let artistsCollection = await MongoHelper.getCollection('artist');

    return artistsCollection
      .find({})
      .toArray();
  }

  getById = async (id: string): Promise<Artist[] | {}> => {
    try {
      let artistsCollection = await MongoHelper.getCollection('artist');
      
      return artistsCollection
        .findOne({ _id: new Types.ObjectId(id) });
      
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  search = async (name: RegExp): Promise<Artist[]> => {
    let artistsCollection = await MongoHelper.getCollection('artist');

    return artistsCollection
      .find({ name })
      .toArray();
  }
}