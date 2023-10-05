import * as dotenv from 'dotenv';
import * as path from 'path';

export const envPath = (file: string) => path.join(__dirname, file);

const envs = {
  dev: envPath('../../src/config/envs/.dev.env'),
};

dotenv.config({ path: envs[process.env.NODE_ENV || 'dev'] });

export default () => ({
  port: parseInt(process.env.PORT) || 3001,

  development:
    ['dev', 'development', 'qa'].includes(process.env.NODE_ENV) ||
    ['dev', 'development', 'qa'].includes(process.env.ENVIRONMENT_MODE),

  mongoDB: {
    port: process.env.MONGO_DB_PORT,
    user: process.env.MONGO_DB_ROOT_USERNAME,
    password: process.env.MONGO_DB_ROOT_PASSWORD,
  },
});
