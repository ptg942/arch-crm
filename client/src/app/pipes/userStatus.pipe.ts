import { Pipe, PipeTransform } from '@angular/core';
import { UserStatusEnum } from '../models/user.models';

@Pipe({
  name: 'userStatus',
  standalone: true,
})
export class UserStatusPipe implements PipeTransform {
  // Теперь transform возвращает класс вместо цвета
  transform(value: UserStatusEnum): { text: string; class: string } {
    switch (value) {
      case UserStatusEnum.NEW:
        return { text: 'Новый', class: 'status-new' };
      case UserStatusEnum.ACTIVE:
        return { text: 'Активный', class: 'status-active' };
      case UserStatusEnum.BLOCKED:
        return { text: 'Заблокирован', class: 'status-blocked' };
      case UserStatusEnum.DELETED:
        return { text: 'Удален', class: 'status-deleted' };
      default:
        return { text: 'Неизвестно', class: 'status-unknown' };
    }
  }
}
