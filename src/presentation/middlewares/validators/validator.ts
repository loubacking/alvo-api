import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validateAsync = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors.array().map(function(item) { 
      return { param: item.param, message: item.msg }
    })

    res.status(400).json({ errors: formattedErrors });
  };
};