import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import {DataAccessModule} from "@arch-crm/data-access";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [DataAccessModule],
})
export class ProjectsModule {}
