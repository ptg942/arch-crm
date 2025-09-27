import {ClientTypeEnum} from "@arch-crm/general";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

export type ClientDocument = Client & Document;

@Schema({ timestamps: true })
export class Client {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    clientType!: ClientTypeEnum;

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

    @Prop({ required: true })
    contacts!: Array<Contact>;
}

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

export const ClientSchema = SchemaFactory.createForClass(Client);