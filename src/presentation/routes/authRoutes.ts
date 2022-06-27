import { Router } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { AuthController } from "../controllers/authController";

const repository = new UserRepository();
const controller = new AuthController(repository);

export const configAuthRoutes = (router: Router) => {
  router.get('/auth', controller.login);
  router.get('/login', controller.login);

}