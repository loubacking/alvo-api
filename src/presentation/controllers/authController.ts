import { Request, Response } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { EncryptHelper } from "../../infra/encrypt/encryptHelper";
import { TokenHelper } from "../helpers/tokenHelper";

export class AuthController {
  private readonly userRepository: UserRepository;
  private readonly encryptHelper: EncryptHelper;
  private readonly tokenHelper: TokenHelper;

  constructor(userRepository: UserRepository, encryptHelper: EncryptHelper, tokenHelper: TokenHelper) {
    this.userRepository = userRepository;
    this.encryptHelper = encryptHelper;
    this.tokenHelper = tokenHelper;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userRepository.getByEmailAsync(email);
    if (user === null) {
      return res.status(400).json({ error: "User doesn't exist" })
    }

    if (!(await this.encryptHelper.validateAsync(password, user?.encryptedPassword))){
      return res.status(400).json({ error: "Wrong password" })
    } 

    const authToken = this.tokenHelper.create(user.fullName, user.email)
    await this.userRepository.updateTokenAsync({id: user._id, authToken});
    return res.status(200).send({ authToken });
  }

  register = async (req: Request, res: Response) => {
    const { email, fullName, password, passwordConfirmation } = req.body;

    const oldUser = await this.userRepository.getByEmailAsync(email.toLowerCase());

    if (oldUser !== null) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: "Password doesn't match password confirmation" });
    }

    const encryptedPassword = await this.encryptHelper.encryptAsync(password);
    const authToken = this.tokenHelper.create(fullName, email);
    const user = {
      email, 
      fullName, 
      authToken
    };
    const userId = await this.userRepository.createAsync({ ...user, encryptedPassword });

    return res.status(201).json({ id: userId, ...user });
  }
}