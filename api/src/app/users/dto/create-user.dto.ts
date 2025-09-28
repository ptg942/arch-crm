export class CreateUserDto {
    fullName!: string;
    email!: string;
    passwordHash!: string;
    role!: string;
    position!: string;
}
