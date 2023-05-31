import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { DEFAULT_MAX_LOG_FILE_SIZE, DEFAULT_PORT } from './const';

export const configuration: ConfigModuleOptions = {
  isGlobal: true,
  validationSchema: Joi.object({
    PORT: Joi.number().default(DEFAULT_PORT),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    LOG_LEVEL: Joi.number().max(5).min(1),
    LOG_FILE_MAX_SIZE: Joi.number().default(DEFAULT_MAX_LOG_FILE_SIZE),
    ERR_DIR: Joi.string().required(),
    LOG_DIR: Joi.string().required(),
    LOGS_FOLDER: Joi.string().required(),
    CRYPT_SALT: Joi.number().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_SECRET_REFRESH_KEY: Joi.string().required(),
    TOKEN_EXPIRE_TIME: Joi.string().required(),
    TOKEN_REFRESH_EXPIRE_TIME: Joi.string().required(),
  }),
};
