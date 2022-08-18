import * as Joi from 'joi';

export const configSchema = Joi.object({
  FORTYTWO_CLIENT_ID: Joi.string().required(),
  FORTYTWO_CLIENT_SECRET: Joi.string().required(),
  CALLBACK: Joi.string().required(),
  DB_SCHEMA: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
