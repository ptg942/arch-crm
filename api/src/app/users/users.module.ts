import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {ArchCrmDataAccessModule} from '@arch-crm/data-access'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [ArchCrmDataAccessModule],
})
export class UsersModule {}
