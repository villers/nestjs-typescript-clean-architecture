import UserRepository from '../../../domain/repository/user.repository';
import CreateUserRequest from '../../../domain/useCase/createUser/createUser.request';
import User from '../../../domain/model/user';

export default class InMemoryUserRepository implements UserRepository {
  users = [];
  auto_increment = 1;

  async createUser({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<User> {
    const u = new User();
    u.id = this.auto_increment;
    u.name = name;
    u.email = email;
    u.password = password;

    this.users.push(u);

    this.auto_increment++;

    return u;
  }

  async exists(createUserRequest: CreateUserRequest): Promise<boolean> {
    return (
      this.users.filter((u) => u.email === createUserRequest.email).length > 0
    );
  }
}
