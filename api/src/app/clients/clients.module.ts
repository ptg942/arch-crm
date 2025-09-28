import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import {DataAccessModule} from "@arch-crm/data-access";

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [DataAccessModule],
})
export class ClientsModule {}
