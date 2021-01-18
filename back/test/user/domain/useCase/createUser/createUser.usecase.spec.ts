import CreateUserUsecase from '../../../../../src/user/domain/useCase/createUser/createUser.usecase';
import InMemoryUserRepository from '../../../../../src/user/infrastructure/repository/inMemory/inMemoryUser.repository';
import { Exception } from '../../../../../src/shared/core/Exception/Exception';

describe('create a user', () => {
  it('can create a user', async () => {
    const StatusRepository = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUsecase(StatusRepository);

    const result = await createUserUseCase.execute({
      name: 'mickael',
      email: 'mickael@mickael.fr',
      password: 'password',
    });

    expect(result).toMatchObject({
      email: 'mickael@mickael.fr',
      id: 1,
      name: 'mickael',
    });
  });

  it('can not create 2 users with same email', async () => {
    const StatusRepository = new InMemoryUserRepository();
    const createUserUseCase = new CreateUserUsecase(StatusRepository);

    const createMultipleUsersWithSameEmail = async () => {
      await createUserUseCase.execute({
        name: 'user1',
        email: 'user@email.fr',
        password: 'password',
      });

      await createUserUseCase.execute({
        name: 'user2',
        email: 'user@email.fr',
        password: 'password',
      });
    };

    await expect(createMultipleUsersWithSameEmail).rejects.toThrow(
      'User already exists.',
    );
  });
});
