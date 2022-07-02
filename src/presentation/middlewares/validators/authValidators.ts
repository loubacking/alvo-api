import { body } from 'express-validator';
import { validateAsync } from './validator';

export const validateRegisterRequestAsync = validateAsync([
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('passwordConfirmation').notEmpty().withMessage('Password confirmation must not be empty'),
    body('fullName').notEmpty().withMessage('Full name must not be empty'),
  ]);