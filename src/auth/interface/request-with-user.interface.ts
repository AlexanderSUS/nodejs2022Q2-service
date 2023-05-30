import { Request } from 'express';
import { UserEntity } from 'src/user/entities/user.entity';

export type RequestWithUser = Request & { user: UserEntity };
