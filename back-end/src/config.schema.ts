import * as Joi from 'joi';

export const configSchema = Joi.object({
  FORTYTWO_APP_ID: Joi.string().required(),
  FORTYTWO_APP_SECRET: Joi.string().required(),
  INTRA_AUTH_URL: Joi.string().required(),
  INTRA_TOKEN_URL: Joi.string().required(),
  INTRA_CLIENT_ID: Joi.string().required(),
  INTRA_CLIENT_SECRET: Joi.string().required(),
  INTRA_CALLBACK_URL: Joi.string().required(),
  INTRA_GET_ME_URL: Joi.string().required(),
  INTRA_APPLICATION_NAME: Joi.string().required(),
  CALLBACK: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
