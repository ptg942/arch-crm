import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
    @ApiProperty({
        example: 'crm@mail.uz',
        description: 'Email пользователя для входа',
    })
    email!: string;

    @ApiProperty({
        example: 'passwordHash',
        description: 'Пароль пользователя',
    })
    password!: string;
}