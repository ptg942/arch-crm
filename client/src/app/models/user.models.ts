export enum UserStatusEnum {
  NEW = 0,
  ACTIVE = 10,
  BLOCKED = 20,
  DELETED = 30,
}
export interface User {
  _id: string;
  fullName: string;
  email: string;
  status: UserStatusEnum;
  passwordHash: string;
  role: UserRoleEnum;
  position: UserPositionEnum;
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserPositionEnum {
  MANAGER = 'manager',
  ARCHITECT = 'architect',
  CONSTRUCTOR = 'constructor',
  ENGINEER = 'engineer',
}
