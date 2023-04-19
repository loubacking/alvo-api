import { prisma } from "../prismaClient";

export type Song = {
  id: string,
  artist: { id: string, name: string },
  createdAt: Date,
  artistId: string,
  name: string,
  lyrics: string | any,
  chords: string | any,
}

export type SongBasics = {
  id: string,
  artist: { id: string, name: string },
  createdAt: Date,
  name: string,
}

export type CreateSongRequest = {
  artistId: string, 
  name: string, 
  lyrics: string, 
  chords: string
}

export class SongsRepository {
  create = async (req: CreateSongRequest): Promise<string> => {
    const { id } = await prisma.song.create({
      data: {
        ...req
      }
    })

    return id;
  }

  getAll = async (): Promise<SongBasics[]> => {
    const songs = await prisma.song.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        artist: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return songs;
  }

  getById = async (id: string): Promise<Song[] | {}> => {
    try {
      const song = await prisma.song.findFirst({
        where: {
          id
        }
      });

      return song;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  search = async (name: string): Promise<SongBasics[]> => {
    const songs = await prisma.song.findMany({
      where: {
        name: {
          contains: name
        }
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        artist: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    return songs;
  }

  
  getByArtistId = async (artistId: string): Promise<Song[]> => {
    try {
      const songs = await prisma.song.findMany({
        where: {
          artistId
        },
        select: {
          id: true,
          name: true,
          lyrics: true,
          chords: true,
          artistId: true,
          playlists: false,
          createdAt: true,
          updateAt: true,
          artist: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      return songs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}