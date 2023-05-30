import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  create(data: { login: string; password: string }) {
    return this.userRepository.create(data);
  }

  findAll(): Promise<IUser[]> {
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
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    return this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
    });
  }

  async remove(id: string) {
    return this.userRepository.remove(id);
  }
}
