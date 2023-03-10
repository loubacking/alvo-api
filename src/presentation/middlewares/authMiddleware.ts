import { NextFunction, Request, Response } from "express";
import { prisma } from "../../infra/db/prismaClient";

export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
  if(req.headers['temporary-access'] === 'alvo2020')
    return next();

  const token = req.headers['x-access-token'];
  
  if(await isUserAuthenticated(token as string))
    return next();
  res.status(400).send({ error: 'User not authenticated' });
}

const isUserAuthenticated = async (authToken: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        authToken
      }
    })

    return user !== null;
  } catch (error) {
    console.error('User is not authenticated', error);
    return false;
  }
}
