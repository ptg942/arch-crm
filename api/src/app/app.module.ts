import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { DealsModule } from './deals/deals.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/arch-crm'),ClientsModule, DealsModule, ProjectsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
