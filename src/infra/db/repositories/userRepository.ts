import { MongoHelper } from "../mongoHelper";

export type User = {
  _id?: string,
  username: string,
  encryptedPassword: string,
  email: string | null
}

export class UserRepository {
  getByEmail = async (email: string): Promise<User | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      return usersCollection
      .findOne({ email });
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  create = async ({ email, encryptedPassword, fullName }): Promise<string | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      const user = await usersCollection
        .insertOne({ email, encryptedPassword, fullName });

      return user.insertedId
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  updateToken = async ({ id, authToken }): Promise<User | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      const { value } = await usersCollection
        .findOneAndUpdate({ _id: id }, { $set: {authToken} }, { returnDocument: 'before' });

      return value;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}