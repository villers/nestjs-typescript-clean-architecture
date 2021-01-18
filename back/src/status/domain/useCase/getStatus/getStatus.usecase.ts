import StatusRepository from '../../repository/status.repository';
import GetStatusResponse from './getStatus.response';

export default class GetStatusUsecase {
  constructor(private repositoryService: StatusRepository) {}

  async execute(): Promise<GetStatusResponse> {
    return { status: this.repositoryService.status() };
  }
}
