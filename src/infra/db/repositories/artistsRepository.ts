import { response } from "express";
import { Types } from "mongoose";
import { MongoHelper } from "../mongoHelper"

export type Artist = {
  _id: string,
  createdAt: string,
  name: string,
  image: string
}

export class ArtistsRepository {
  update = async (id: string, params: any): Promise<string | null> => {
    try {
      const artistsCollection = await MongoHelper.getCollection('artist');
      const response = await artistsCollection.updateOne(
        { _id: Types.ObjectId(id) }, 
        { $set: {...params, editedAt: Date.now().toLocaleString() }});
      
      return response.upsertedId.toString();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  create = async (name: string, imageUrl: string): Promise<string> => {
    const artistsCollection = await MongoHelper.getCollection('artist');
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