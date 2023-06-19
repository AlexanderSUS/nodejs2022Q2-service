import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(data: { login: string; password: string }) {
    return this.userRepository.create(data);
  }

  findAll() {
    return this.userRepository.getAll();
  }

  findOne(id: string) {
    return this.userRepository.getById(id);
  }

  findOneByLogin(login: string) {
    return this.userRepository.getByLogin(login);
  }

  updateRefreshToken(id: string, refreshTokenHash: string) {
    return this.userRepository.update(id, { refreshTokenHash });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepository.getById(id);

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is wrong');
    }

    return this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
    });
  }

  async remove(id: string) {
    return this.userRepository.remove(id);
  }
}
