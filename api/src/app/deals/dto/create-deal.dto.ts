import { ApiProperty } from '@nestjs/swagger';
import { DealStatusEnum } from '@arch-crm/general';

export class CreateDealDto {
    @ApiProperty({ example: "Проект коттеджа в КП 'Лесной'", description: 'Название сделки' })
    title!: string;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d123456', description: 'ID клиента' })
    clientId!: string;

    @ApiProperty({ example: "ООО 'СтройИнвест'", description: 'Денормализованное имя клиента' })
    clientName!: string;

    @ApiProperty({ example: '652a1f4b3f1d2a6c7d654321', description: 'ID ответственного пользователя' })
    responsibleUserId!: string;

    @ApiProperty({ enum: DealStatusEnum, example: DealStatusEnum.NEW_LEAD, description: 'Статус сделки' })
    status!: DealStatusEnum;

    @ApiProperty({ example: 1500000.0, description: 'Бюджет сделки' })
    budget!: number;

    @ApiProperty({ example: 'Описание сделки или комментарий', required: false })
    description?: string;
}
