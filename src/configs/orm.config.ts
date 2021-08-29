import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  autoLoadEntities: true,
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  entityPrefix: 'tb_',
  options: {
    encrypt: Boolean(process.env.TYPEORM_OPTIONS__ENCRYPT),
  },
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: './src/migrations',
  },
};
console.log(__dirname);
