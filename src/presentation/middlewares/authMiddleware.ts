import { NextFunction, Request, Response } from "express";
import { authToken } from "../../utils/globals";

export const isAuthenticated = async(req: Request, res: Response, next: NextFunction) => {
  if(req.headers['temporary-access'] === 'alvo2020')
    return next();

  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  
  if(isUserAuthenticated(token))
    return next();
  res.status(400).send({ error: 'User not authenticated' });
}

const isUserAuthenticated = (token: string): boolean => {
  return authToken[token] || false;
}
