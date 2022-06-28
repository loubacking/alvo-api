import { MongoHelper } from "../mongoHelper";

export type User = {
  username: string,
  password: string,
  email: string | null
}

export class UserRepository {
  getByUsername = async (username: string): Promise<User | null> => {
    try {
      let usersCollection = await MongoHelper.getCollection('users');
      
      return usersCollection
      .findOne({ username });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}