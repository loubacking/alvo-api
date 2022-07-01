import { Request, Response } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { EncryptHelper } from "../../infra/encrypt/encryptHelper";
import { authToken } from "../../utils/globals";
import { generateToken } from "../../utils/utils";
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

    const user = await this.userRepository.getByEmail(email);
    if (this.encryptHelper.validate(user?.encryptedPassword, password)) {
        const token = generateToken();
        authToken[token] = email;
        console.log("Auth Token", token);
        return res.status(200).send({token});
    } else {
        console.log("Incorrect Username or Password");
        return res.sendStatus(400);
    }
  }

  register = async (req: Request, res: Response) => {
    const { email, fullName, password, passwordConfirmation } = req.body;

    const oldUser = await this.userRepository.getByEmail(email.toLowerCase());

    if (oldUser !== null) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({ error: "Password doesn't match password confirmation" });
    }

    const encryptedPass = await this.encryptHelper.encrypt(password);
    const userId = await this.userRepository.create({email, fullName, encryptedPassword: encryptedPass})
    const authToken = this.tokenHelper.create(userId, email);
    const { encryptedPassword, ...user} = await this.userRepository.updateToken({ id: userId, authToken });

    return res.status(201).json(user);
  }
}