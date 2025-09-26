import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema";

@Module({
	controllers: [],
	providers: [],
	exports: [MongooseModule],
	imports: [ MongooseModule.forFeature([
		{ name: User.name, schema: UserSchema },
	]),]
})
export class ArchCrmDataAccessModule {}
