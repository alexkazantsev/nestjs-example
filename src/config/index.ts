const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  LOG_LEVEL,
  JWT_SECRET,
  JWT_EXPIRES,
} = process.env;
import { ORM_COFIG } from './orm.config';

export {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  LOG_LEVEL,
  ORM_COFIG,
  JWT_SECRET,
  JWT_EXPIRES,
};
