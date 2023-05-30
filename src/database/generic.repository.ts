export abstract class GenericRepository<T extends { id: number | string }> {
  abstract getAll(): Promise<T[]>;

  abstract getById(id: T['id']): Promise<T>;

  abstract create(data: T): Promise<T>;

  abstract update(id: T['id'], updateDto: Partial<T>): Promise<T>;

  abstract remove(id: T['id']): Promise<void>;
}
