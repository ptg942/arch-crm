import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema, Client, ClientSchema, Project, ProjectSchema, Deal, DealSchema} from "./schema";

@Module({
	controllers: [],
	providers: [],
	exports: [MongooseModule],
	imports: [ MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema },
		{ name: Client.name, schema: ClientSchema },
		{ name: Project.name, schema: ProjectSchema },
		{ name: Deal.name, schema: DealSchema },
	]),]
})
export class ArchCrmDataAccessModule {}
