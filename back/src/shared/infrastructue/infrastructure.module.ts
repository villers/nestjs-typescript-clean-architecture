import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { NestHttpExceptionFilter } from './exceptionFilter/nestHttp.exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://user:password@localhost:5432/user',
      database: 'user',
      synchronize: true,
      entities: [UserEntity],
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
