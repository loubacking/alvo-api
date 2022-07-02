import { MongoHelper } from "../mongoHelper";

export type User = {
  _id?: string,
  fullName: string,
  username: string,
  encryptedPassword: string,
  email: string | null
}

export class UserRepository {
  getByEmailAsync = async (email: string): Promise<User | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      return usersCollection
      .findOne({ email });
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  createAsync = async ({ email, encryptedPassword, fullName, authToken }): Promise<string | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      const user = await usersCollection
        .insertOne({ email, encryptedPassword, fullName, authToken });

      return user.insertedId
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  updateTokenAsync = async ({ id, authToken }): Promise<User | null> => {
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