import { Module, Provider } from '@nestjs/common';
import GetStatusController from './infrastructure/controller/getStatus.controller';
import InMemoryStatusRepository from './infrastructure/repository/inMemory/InMemoryStatusRepository';
import GetStatusUsecase from './domain/useCase/getStatus/getStatus.usecase';

const persistenceProviders: Provider[] = [
  {
    provide: 'StatusRepository',
    useClass: InMemoryStatusRepository,
  },
];

const useCaseProviders: Provider[] = [
  {
    provide: 'GetStatusUsecase',
    useFactory: (statusRepository) => new GetStatusUsecase(statusRepository),
    inject: ['StatusRepository'],
  },
];

@Module({
  imports: [],
  controllers: [GetStatusController],
  providers: [...persistenceProviders, ...useCaseProviders],
})
export default class StatusModule {}
