import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {ProjectStatusEnum, TaskStatusEnum} from "@arch-crm/general";

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title!: string;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    assigneeId!: Types.ObjectId; // ссылка на пользователя

    @Prop({ required: true, enum: TaskStatusEnum, type: Number })
    status!: TaskStatusEnum;

    @Prop()
    dueDate?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    name!: string;

    @Prop({ required: true })
    projectCode!: string;

    @Prop({ type: Types.ObjectId, ref: "Client", required: true })
    clientId!: Types.ObjectId;

    @Prop({ required: true })
    clientName!: string; // денормализованное поле

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    managerId!: Types.ObjectId; // ГАП

    @Prop({ required: true, enum: ProjectStatusEnum, type: Number })
    status!: ProjectStatusEnum;

    @Prop({ required: true })
    budgetPlanned!: number;

    @Prop()
    startDate?: Date;

    @Prop()
    endDatePlanned?: Date;

    @Prop({ type: Types.ObjectId, ref: "Deal" })
    dealId?: Types.ObjectId; // сделка

    @Prop({ type: [TaskSchema], _id: true }) // 👈 вложенные задачи
    tasks!: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
