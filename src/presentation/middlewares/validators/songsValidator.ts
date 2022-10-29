import { body, param } from 'express-validator';
import { validateAsync } from './validator';

export const validateSongIdOnRequestAsync = validateAsync([
  param('id').isUUID().withMessage('Id is not valid')
]);

export const validateCreateSongRequestAsync = validateAsync([
  body('artistId').isUUID().withMessage('Id is not valid'),
  body('name').notEmpty().withMessage('Song name must not be empty').isLength({ max: 50 }).withMessage('Song name must not be greater than 50'),
  body('lyrics').notEmpty().withMessage('Lyrics name must not be empty'),
  body('chords').notEmpty().withMessage('Chords name must not be empty'),
]);