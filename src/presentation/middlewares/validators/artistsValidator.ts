import { body, param } from 'express-validator';
import { validateAsync } from './validator';

export const validateArtistIdOnRequestAsync = validateAsync([
  param('id').isMongoId().withMessage('Id is not valid')
]);

export const validateCreateArtistRequestAsync = validateAsync([
  body('name').notEmpty().withMessage('Artist name must not be empty').isLength({ max: 50 }).withMessage('Artist name must not be greater than 50'),
  body('imageUrl').isURL({protocols: ['https']}).withMessage('Image url is not valid. (Must use https)'),
]);

export const validateEditArtistRequestAsync = validateAsync([
  body('id').isMongoId().withMessage('Id is not valid'),
  body('name').optional({nullable: true}).notEmpty().withMessage('Artist name must not be empty').isLength({ max: 50 }).withMessage('Artist name must not be greater than 50'),
  body('imageUrl').optional({nullable: true}).isURL({protocols: ['https']}).withMessage('Image url is not valid. (Must use https)'),
]);