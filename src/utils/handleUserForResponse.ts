import { UserEntity } from 'src/user/entities/user.entity';

const handleUserForResponse = (user: UserEntity) => {
  user.createdAt = new Date(user.createdAt).getTime();
  user.updatedAt = new Date(user.updatedAt).getTime();

  delete user.password;

  return user;
};

export default handleUserForResponse;
