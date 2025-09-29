import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatusEnum } from '@arch-crm/general';
import { TaskDto } from './task.dto';

export class CreateProjectDto {
    @ApiProperty({ example: "Проект коттеджа в КП 'Лесной'", description: 'Название проекта' })
    name!: string;

    @ApiProperty({ example: '25-09-PID', description: 'Код проекта' })
    projectCode!: string;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d123456', description: 'ID клиента' })
    clientId!: string;

    @ApiProperty({ example: "ООО 'СтройИнвест'", description: 'Денормализованное имя клиента' })
    clientName!: string;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d654321', description: 'ID менеджера проекта (ГАП)' })
    managerId!: string;

    @ApiProperty({ enum: ProjectStatusEnum, example: ProjectStatusEnum.IN_PROGRESS, description: 'Статус проекта' })
    status!: ProjectStatusEnum;

    @ApiProperty({ example: 1500000.00, description: 'Запланированный бюджет' })
    budgetPlanned!: number;

    @ApiProperty({ example: '2025-09-29T00:00:00.000Z', required: false, description: 'Дата начала' })
    startDate?: Date;

    @ApiProperty({ example: '2026-03-15T00:00:00.000Z', required: false, description: 'Планируемая дата окончания' })
    endDatePlanned?: Date;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d987654', required: false, description: 'ID сделки' })
    dealId?: string;

    @ApiProperty({ type: [TaskDto], description: 'Список задач в проекте' })
    tasks!: TaskDto[];
}
