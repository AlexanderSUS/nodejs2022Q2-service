import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConnectionOptions from 'src/config/postgresConnectionOptions';

@Module({
  imports: [TypeOrmModule.forRoot(postgresConnectionOptions)],
})
export class DatabaseModule {}
