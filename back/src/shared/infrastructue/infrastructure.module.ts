import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NestHttpExceptionFilter } from './exceptionFilter/nestHttp.exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions =>
        config.get<TypeOrmModuleOptions>('typeOrm'),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class InfrastructureModule {}
