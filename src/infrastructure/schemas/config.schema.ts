import * as Joi from 'joi';

const databaseSchema = Joi.object({
  host: Joi.string().required(),
  port: Joi.number().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  database: Joi.string().required(),
});

const appSchema = Joi.object({
  port: Joi.number().default(3000),
});

export const configSchema = Joi.object({
  app: appSchema,
  database: databaseSchema,
});
