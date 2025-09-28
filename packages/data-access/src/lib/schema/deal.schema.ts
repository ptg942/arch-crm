import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {DealStatusEnum} from "@arch-crm/general";

export type DealDocument = Deal & Document;

@Schema({ timestamps: true })
export class Deal {
    @Prop({ required: true })
    title!: string;

    @Prop({ type: Types.ObjectId, ref: "Client", required: true })
    clientId!: Types.ObjectId;

    @Prop({ required: true })
    clientName!: string; // денормализованное поле

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    responsibleUserId!: Types.ObjectId;

    @Prop({ required: true, enum: DealStatusEnum, type: Number })
    status!: DealStatusEnum;

    @Prop({ required: true })
    budget!: number;

    @Prop()
    description?: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
