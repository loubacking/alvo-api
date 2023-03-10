import { prisma } from "../prismaClient";

export type Artist = {
  id: string,
  name: string,
  imageUrl: string
  createdAt: Date,
}

export class ArtistsRepository {
  update = async (id: string, params: any): Promise<boolean | null> => {
    try {
      const artist = await prisma.artist.update({
        where: {
          id
        },
        data: {
          ...params
        }
      })

      return artist !== null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  create = async (name: string, imageUrl: string): Promise<string> => {
    const { id } = await prisma.artist.create({
      data: {
        name,
        imageUrl,
      }
    });

    return id;
  }

  getAll = async (): Promise<Artist[]> => {
    const allArtists = await prisma.artist.findMany();

    return allArtists;
  }

  getById = async (id: string): Promise<Artist | null> => {
    try {
      const artist = await prisma.artist.findFirst({
        where: {
          id
        }
      });

      return artist;
      
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  search = async (name: string): Promise<Artist[]> => {
    const artists = await prisma.artist.findMany({
      where: {
        name: {
          contains: name
        }
      }
    });

    return artists;
  }
}