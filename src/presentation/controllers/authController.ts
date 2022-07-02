import { Request, Response } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { authToken } from "../../utils/globals";
import { generateToken } from "../../utils/utils";

export class AuthController {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.userRepository.getByUsername(username);
    if (user?.password === password) {
        const token = generateToken();
        authToken[token] = username;
        console.log("Auth Token", token);
        return res.status(200).send({token});
    } else {
        console.log("Incorrect Username or Password");
        return res.sendStatus(400);
    }
  }
}