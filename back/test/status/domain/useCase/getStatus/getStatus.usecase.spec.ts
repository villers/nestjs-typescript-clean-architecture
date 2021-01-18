import StatusRepository from '../../../../../src/status/domain/repository/status.repository';
import GetStatusUsecase from '../../../../../src/status/domain/useCase/getStatus/getStatus.usecase';
import InMemoryStatusRepository from '../../../../../src/status/infrastructure/repository/inMemory/InMemoryStatusRepository';

describe('use case getStatus', () => {
  let statusRepository: StatusRepository;
  let getStatusUseCase: GetStatusUsecase;

  beforeEach(() => {
    statusRepository = new InMemoryStatusRepository();
    getStatusUseCase = new GetStatusUsecase(statusRepository);
  });

  it('return a status', async () => {
    const result = await getStatusUseCase.execute();
    expect(result.status).toBeTruthy();
  });
});
