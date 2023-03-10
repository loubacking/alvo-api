import { prisma } from "../prismaClient";

export type User = {
  id: string,
  fullName: string,
  email: string
  googleId?: string,
  encryptedPassword: string,
}

export class UserRepository {
  getByEmailAsync = async (email: string): Promise<User | null> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  createAsync = async ({ email, encryptedPassword, fullName, authToken }): Promise<string | null> => {
    try {
      const { id } = await prisma.user.create({
        data: {
          email,
          encryptedPassword,
          fullName,
          authToken
        }
      });

      return id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  updateTokenAsync = async ({ id, authToken }): Promise<User | null> => {
    try {
      const user = await prisma.user.update({
        where: {
          id
        },
        data: {
          authToken
        }
      });

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}