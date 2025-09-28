import {ClientStatusEnum, ClientTypeEnum} from "@arch-crm/general";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Contact {
    @Prop({ required: true })
    fullName!: string;

    @Prop({ required: true })
    position!: string;

    @Prop({ required: true })
    phone!: string;

    @Prop()
    email!: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true, enum: ClientTypeEnum, type: Number })
    type!: ClientTypeEnum;

    @Prop({ required: true, enum: ClientStatusEnum, type: Number, default: ClientStatusEnum.NEW })
    status!: ClientStatusEnum;

    @Prop({ required: true })
    phone!: string;

    @Prop({ required: true })
    email!: string;

    @Prop({ required: true })
    address!: string;

    @Prop()
    inn!: string;

    @Prop({ required: true })
    responsibleUserId!: string;

    @Prop({ type: [ContactSchema], _id: false })
    contacts!: Contact[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);

