import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import {DataAccessModule} from "@arch-crm/data-access";

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  imports: [DataAccessModule],
})
export class DealsModule {}
