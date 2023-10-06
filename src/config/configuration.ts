import * as dotenv from 'dotenv';
import * as path from 'path';

export const envPath = (file: string) => path.join(__dirname, file);

const envs = {
  dev: envPath('./envs/.dev.env'),
};

dotenv.config({ path: envs[process.env.NODE_ENV || 'dev'] });

export default () => ({
  port: parseInt(process.env.PORT) || 3001,

  development:
    ['dev', 'development', 'qa'].includes(process.env.NODE_ENV) ||
    ['dev', 'development', 'qa'].includes(process.env.ENVIRONMENT_MODE),
});
