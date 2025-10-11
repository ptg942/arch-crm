import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserEditComponent } from '../features/users/edit/user-edit.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  // Метод для открытия окна редактирования пользователя
  openEditUserDialog(userId: string): Observable<any> {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '500px', // Задаем ширину окна
      disableClose: true, // Запрещаем закрытие по клику на фон
      data: { id: userId }, // 👈 Передаем ID пользователя в компонент
    });

    // Возвращаем Observable, который сработает при закрытии окна
    return dialogRef.afterClosed();
  }
}
