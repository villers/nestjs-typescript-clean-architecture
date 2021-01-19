import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  url:
    process.env.TYPEORM_URL || 'postgresql://user:password@localhost:5432/user',
  logging: process.env.TYPEORM_LOGGING === 'true',
  synchronize: true,
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
};

export default () => ({
  server: {
    port: parseInt(process.env.PORT) || 3000,
  },
  typeOrm,
});
