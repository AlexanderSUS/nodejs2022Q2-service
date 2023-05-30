import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenericRepository } from 'src/database/generic.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PostgresErrorCode } from 'src/database/enum/postgres-error-code.enum';

@Injectable()
export class UserRepository implements GenericRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(data: { login: string; password: string }) {
    try {
      const user = await this.usersRepository.save(
        this.usersRepository.create(data),
      );

      return user;
    } catch (err) {
      if ('code' in err && err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('Login already busy');
      }

      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateDto: Partial<Omit<UserEntity, 'id'>>,
  ): Promise<UserEntity> {
    const user = await this.getById(id);

    if (!user) throw new NotFoundException();

    return this.usersRepository.save({ ...user, ...updateDto });
  }

  async remove(id: string): Promise<void> {
    const { affected } = await this.usersRepository.delete({ id });

    if (!affected) {
      throw new NotFoundException();
    }
  }

  async getByLogin(login: string) {
    const user = this.usersRepository.findOneBy({ login });

    if (!user) throw new NotFoundException();

    return user;
  }
}
