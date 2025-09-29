import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {DataAccessModule} from '@arch-crm/data-access'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataAccessModule],
  exports: [UsersService],
})
export class UsersModule {}
