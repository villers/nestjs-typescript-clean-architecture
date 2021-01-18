import StatusRepository from '../../../domain/repository/status.repository';

export default class InMemoryStatusRepository implements StatusRepository {
  status(): boolean {
    return true;
  }
}
