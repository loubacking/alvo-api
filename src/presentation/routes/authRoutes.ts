import { Router } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { EncryptHelper } from "../../infra/encrypt/encryptHelper";
import { AuthController } from "../controllers/authController";
import { TokenHelper } from "../helpers/tokenHelper";

const repository = new UserRepository();
const encryptHelper = new EncryptHelper(process.env.SALT);
const tokenHelper = new TokenHelper(process.env.TOKEN_KEY, process.env.TOKEN_EXPIRES_IN);
const controller = new AuthController(repository, encryptHelper, tokenHelper);

export const configAuthRoutes = (router: Router) => {
  router.post('/register', controller.register);
  router.post('/login', controller.login);

}