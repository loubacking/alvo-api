import bodyParser from "body-parser";
import cors from "cors";
import { Application } from "express";

export const setupMiddlewares = (app: Application) => {
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use(function (req, res, next) {
    console.log('Time:', Date.now().toLocaleString());
      next();
    });
}