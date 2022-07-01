import jwt from 'jsonwebtoken';

export class TokenHelper {
  private readonly tokenKey: string;
  private readonly expiresIn: string;

  constructor(tokenKey: string, expiresIn: string){
    this.tokenKey = tokenKey;
    this.expiresIn = expiresIn;
  }

  create = (userId: string, email: string): string => {
    return jwt.sign(
      { userId: userId, email },
      this.tokenKey,
      {
        expiresIn: this.expiresIn,
      }
    );
  }
}