import { Module } from '@nestjs/common';
import StatusModule from './status/status.module';
import UserModule from './user/user.module';
import { NestHttpExceptionFilter } from './shared/infrastructue/exception-filter/NestHttpExceptionFilter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/infrastructure/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://user:password@localhost:5432/user',
      database: 'user',
      synchronize: true,
      entities: [UserEntity],
    }),
    StatusModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: NestHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
