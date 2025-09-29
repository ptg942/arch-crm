import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from '@arch-crm/general';

export class TaskDto {
    @ApiProperty({ example: 'Разработать эскизный проект', description: 'Название задачи' })
    title!: string;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d123456', description: 'ID пользователя-исполнителя' })
    assigneeId!: string;

    @ApiProperty({ enum: TaskStatusEnum, example: TaskStatusEnum.IN_PROGRESS, description: 'Статус задачи' })
    status!: TaskStatusEnum;

    @ApiProperty({ example: '2025-10-10T00:00:00.000Z', required: false, description: 'Дедлайн задачи' })
    dueDate?: Date;
}
