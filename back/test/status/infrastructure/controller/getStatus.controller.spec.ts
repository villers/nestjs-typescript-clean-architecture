import GetStatusController from '../../../../src/status/infrastructure/controller/getStatus.controller';
import InMemoryStatusRepository from '../../../../src/status/infrastructure/repository/inMemory/InMemoryStatusRepository';
import GetStatusUsecase from '../../../../src/status/domain/useCase/getStatus/getStatus.usecase';

describe('use case getStatus', () => {
  it('must return true', async () => {
    const repository = new InMemoryStatusRepository();
    const useCase = new GetStatusUsecase(repository);
    const controller = new GetStatusController(useCase);

    const result = await controller.invoke();

    expect(result).toMatchObject({
      code: 200,
      data: {
        status: true,
      },
      message: 'Success.',
    });
  });
});
