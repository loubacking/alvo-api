import { Router } from "express";
import { UserRepository } from "../../infra/db/repositories/userRepository";
import { EncryptHelper } from "../../infra/encrypt/encryptHelper";
import { AuthController } from "../controllers/authController";
import { TokenHelper } from "../helpers/tokenHelper";
import { validateLoginRequestAsync, validateRegisterRequestAsync } from "../middlewares/validators/authValidators";

const repository = new UserRepository();
const encryptHelper = new EncryptHelper(process.env.SALT);
const tokenHelper = new TokenHelper(process.env.TOKEN_KEY, process.env.TOKEN_EXPIRES_IN);
const controller = new AuthController(repository, encryptHelper, tokenHelper);

export const configAuthRoutes = (router: Router) => {
  router.post('/register', validateRegisterRequestAsync, (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Register a new user'
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
          $email: 'john@mail.com',
          $fullName: 'John Doe',
          $password: 'string with more than 6 characters',
          $passwordConfirmation: 'string with more than 6 characters',
      }
    } */
    controller.register(req, res);
  });

  router.post('/login', validateLoginRequestAsync, (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Login with provided email and password'
    /* #swagger.parameters['body'] = {
      in: 'body',
      schema: {
          $email: 'john@mail.com',
          $password: 'string with more than 6 characters',
      }
    } */
    controller.login(req, res);
  });

}