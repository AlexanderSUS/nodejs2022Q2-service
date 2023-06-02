export interface EnvironmentVariables {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  LOG_LEVEL: number;
  LOG_FILE_MAX_SIZE: number;
  ERR_DIR: string;
  LOG_DIR: string;
  LOGS_FOLDER: string;
  CRYPT_SALT: number;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
}
