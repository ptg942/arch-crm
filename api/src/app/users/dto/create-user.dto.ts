import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'John Doe', description: 'Полное имя пользователя' })
    fullName!: string;

    @ApiProperty({ example: 'john@example.com', description: 'Email пользователя' })
    email!: string;

    @ApiProperty({ example: 'hashed_password_123', description: 'Хэш пароля' })
    passwordHash!: string;

    @ApiProperty({ example: 'admin', description: 'Роль пользователя' })
    role!: string;

    @ApiProperty({ example: 'Manager', description: 'Должность пользователя' })
    position!: string;
}