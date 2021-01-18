import { Controller, Get, Inject } from '@nestjs/common';
import GetStatusUsecase from '../../domain/useCase/getStatus/getStatus.usecase';
import { CoreApiResponse } from '../../../shared/core/CoreApiResponse';
import GetStatusResponse from '../../domain/useCase/getStatus/getStatus.response';

@Controller()
export default class GetStatusController {
  constructor(@Inject('GetStatusUsecase') private useCase: GetStatusUsecase) {}

  @Get('/status')
  async invoke(): Promise<CoreApiResponse<GetStatusResponse>> {
    const status = await this.useCase.execute();

    return CoreApiResponse.success(status);
  }
}
