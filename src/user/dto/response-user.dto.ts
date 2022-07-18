export class UserResponse {
  readonly id: string; // uuid v4
  readonly login: string;
  readonly version: number; // integer number, increments on update
  readonly createdAt: number; // timestamp of creation
  readonly updatedAt: number; // timestamp of last update
}
