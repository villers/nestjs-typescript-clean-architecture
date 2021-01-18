import CreateUserRequest from './createUser.request';
import UserRepository from '../../repository/user.repository';
import CreateUserResponse from './createUser.response';
import { CoreAssert } from '../../../../shared/core/CoreAssert';
import { Code } from '../../../../shared/core/code/Code';
import { Exception } from '../../../../shared/core/Exception/Exception';

export default class CreateUserUsecase {
  constructor(private repository: UserRepository) {}

  async execute(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const doesUserExist: boolean = await this.repository.exists(
      createUserRequest,
    );

    CoreAssert.isFalse(
      doesUserExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'User already exists.',
      }),
    );

    const user = await this.repository.createUser(createUserRequest);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
