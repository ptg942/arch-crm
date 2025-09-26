import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { UserStatusEnum } from '@arch-crm/general'

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    fullName!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true })
    passwordHash!: string;

    @Prop({ required: true })
    role!: string;

    @Prop({ required: true })
    position!: string;

    @Prop({ default: UserStatusEnum.NEW })
    status!: UserStatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);