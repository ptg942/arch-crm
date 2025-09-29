import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email пользователя для входа',
    })
    email!: string;

    @ApiProperty({
        example: 'password123',
        description: 'Пароль пользователя',
    })
    password!: string;
}