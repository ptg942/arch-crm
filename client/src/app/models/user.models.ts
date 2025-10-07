export enum UserStatusEnum {
  NEW = 0,
  ACTIVE = 10,
  BLOCKED = 20,
  DELETED = 30,
}
export interface User {
  id: string;
  fullName: string;
  email: string;
  status: UserStatusEnum;
}
