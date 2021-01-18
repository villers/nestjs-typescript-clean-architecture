import { Body, Controller, Inject, Post } from '@nestjs/common';
import CreateUserUsecase from '../../domain/useCase/createUser/createUser.usecase';
import CreateUserRequest from '../../domain/useCase/createUser/createUser.request';
import { CoreApiResponse } from '../../../shared/core/CoreApiResponse';
import CreateUserResponse from '../../domain/useCase/createUser/createUser.response';

@Controller()
export default class CreateUserController {
  constructor(
    @Inject('CreateUserUsecase') private useCase: CreateUserUsecase,
  ) {}

  @Post('/user')
  async invoke(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<CoreApiResponse<CreateUserResponse>> {
    const userCreated = await this.useCase.execute(createUserRequest);

    return CoreApiResponse.success(userCreated);
  }
}
