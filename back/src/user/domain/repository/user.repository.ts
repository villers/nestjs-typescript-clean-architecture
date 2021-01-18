import User from '../model/user';
import CreateUserRequest from '../useCase/createUser/createUser.request';

export default interface UserRepository {
  createUser({ name, email, password }: CreateUserRequest): Promise<User>;
  exists(createUserRequest: CreateUserRequest): Promise<boolean>;
}
