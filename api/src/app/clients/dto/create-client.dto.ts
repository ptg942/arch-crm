import { ApiProperty } from '@nestjs/swagger';
import { ClientTypeEnum, ClientStatusEnum } from '@arch-crm/general';

export class ContactDto {
    @ApiProperty({ example: 'Иван Иванов', description: 'ФИО контакта' })
    fullName!: string;

    @ApiProperty({ example: 'Менеджер', description: 'Должность контакта' })
    position!: string;

    @ApiProperty({ example: '+998901234567', description: 'Телефон контакта' })
    phone!: string;

    @ApiProperty({ example: 'ivanov@example.com', description: 'Email контакта' })
    email!: string;
}

export class CreateClientDto {
    @ApiProperty({ example: 'ООО Ромашка', description: 'Название клиента' })
    name!: string;

    @ApiProperty({ enum: ClientTypeEnum, example: ClientTypeEnum.LEGAL, description: 'Тип клиента' })
    type!: ClientTypeEnum;

    @ApiProperty({ enum: ClientStatusEnum, example: ClientStatusEnum.ACTIVE, required: false, description: 'Статус клиента' })
    status?: ClientStatusEnum;

    @ApiProperty({ example: '+998901112233', description: 'Телефон клиента' })
    phone!: string;

    @ApiProperty({ example: 'info@company.uz', description: 'Email клиента' })
    email!: string;

    @ApiProperty({ example: 'г. Ташкент, ул. Амир Темур, 12', description: 'Адрес клиента' })
    address!: string;

    @ApiProperty({ example: '305123456', required: false, description: 'ИНН клиента' })
    inn?: string;

    @ApiProperty({ example: '64f0d7c2a4b7f1a2c9d3e4f5', description: 'ID ответственного пользователя' })
    responsibleUserId!: string;

    @ApiProperty({ type: ContactDto, description: 'Контактные данные клиента' })
    contacts!: ContactDto;
}
