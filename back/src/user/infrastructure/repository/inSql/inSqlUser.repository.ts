import UserRepository from '../../../domain/repository/user.repository';
import CreateUserRequest from '../../../domain/useCase/createUser/createUser.request';
import User from '../../../domain/model/user';
import { UserEntity } from '../../entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UserMapper } from '../../mapper/user.mapper';

@EntityRepository(UserEntity)
export default class InSqlUserRepository
  extends Repository<UserEntity>
  implements UserRepository {
  async createUser({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<User> {
    const user = await this.insert({
      name,
      email,
      password,
    });

    return UserMapper.toDomainEntity(user.raw);
  }

  async exists(createUserRequest: CreateUserRequest): Promise<boolean> {
    const user = await this.findOne({
      email: createUserRequest.email,
    });

    return user !== undefined;
  }
}
