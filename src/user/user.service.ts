import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { DbMessage, DbStoreKey } from 'src/const/enum';

@Injectable()
export class UserService {
  constructor(private readonly DbService: DbService) {}

  async create(userDto: CreateUserDto) {
    return this.DbService.create({ dto: userDto, type: DbStoreKey.users });
  }

  async findAll() {
    return this.DbService.findAll(DbStoreKey.users);
  }

  async findOne(id: string) {
    const user = this.DbService.findOne(id, DbStoreKey.users);

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const result = this.DbService.update(id, {
      dto: updatePasswordDto,
      type: DbStoreKey.users,
    });

    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (result === DbMessage.wrongPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    return result;
  }

  async remove(id: string) {
    const isFound = this.DbService.remove(id, DbStoreKey.users);

    if (!isFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
