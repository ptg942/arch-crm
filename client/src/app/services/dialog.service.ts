import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UpdateUserComponent } from '../features/users/update/update-user.component';
import { CreateUserComponent } from '../features/users/create/create-user.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);
  openCreateUserDialog(): Observable<any> {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '500px', // Задаем ширину окна
      disableClose: true, // Запрещаем закрытие по клику на фон
    });

    // Возвращаем Observable, который сработает при закрытии окна
    return dialogRef.afterClosed();
  }

  // Метод для открытия окна редактирования пользователя
  openUpdateUserDialog(userId: string): Observable<any> {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px', // Задаем ширину окна
      disableClose: true, // Запрещаем закрытие по клику на фон
      data: { id: userId }, // 👈 Передаем ID пользователя в компонент
    });

    // Возвращаем Observable, который сработает при закрытии окна
    return dialogRef.afterClosed();
  }
}
