import { join } from 'path';
import connectionConfig from './orm.config';

const tentantConfig = {
  ...connectionConfig,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};

export default tentantConfig;
