import { Module, Provider } from '@nestjs/common';
import CreateUserController from './infrastructure/controller/createUser.controller';
// import InMemoryUserRepository from './infrastructure/repository/inMemory/InMemoryUserRepository';
import CreateUserUsecase from './domain/useCase/createUser/createUser.usecase';
import InSqlUserRepository from './infrastructure/repository/inSql/inSqlUser.repository';
import { Connection } from 'typeorm';

const persistenceProviders: Provider[] = [
  {
    provide: 'UserRepository',
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(InSqlUserRepository),
    inject: [Connection],
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: 'CreateUserUsecase',
    useFactory: (userRepository) => new CreateUserUsecase(userRepository),
    inject: ['UserRepository'],
  },
];

@Module({
  //imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [CreateUserController],
  providers: [...persistenceProviders, ...useCaseProviders],
})
export default class UserModule {}
