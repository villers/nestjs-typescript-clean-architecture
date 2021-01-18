import CreateUserController from '../../../../src/user/infrastructure/controller/createUser.controller';
import InMemoryUserRepository from '../../../../src/user/infrastructure/repository/inMemory/inMemoryUser.repository';
import CreateUserUsecase from '../../../../src/user/domain/useCase/createUser/createUser.usecase';

describe('use case create a user', () => {
  it('a user must be created and returned', async () => {
    const repository = new InMemoryUserRepository();
    const useCase = new CreateUserUsecase(repository);
    const controller = new CreateUserController(useCase);

    const result = await controller.invoke({
      name: 'name',
      email: 'email@email.fr',
      password: 'password',
    });

    expect(result).toMatchObject({
      code: 200,
      data: {
        email: 'email@email.fr',
        id: 1,
        name: 'name',
      },
      message: 'Success.',
    });
  });
});
