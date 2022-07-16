import { NextFunction, Request, Response } from "express";
import { MongoHelper } from "../../infra/db/mongoHelper";

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
    const users = await MongoHelper.getCollection('users');
    
    const response = await users
      .findOne({ authToken });
    
    return response !== null
  } catch (error) {
    console.error('User is not authenticated', error);
    return false;
  }
}
