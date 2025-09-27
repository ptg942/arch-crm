import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema, Client, ClientSchema} from "./schema";

@Module({
	controllers: [],
	providers: [],
	exports: [MongooseModule],
	imports: [ MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema },
		{ name: Client.name, schema: ClientSchema },
	]),]
})
export class ArchCrmDataAccessModule {}
