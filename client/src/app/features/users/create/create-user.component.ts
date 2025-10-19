import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// 👇 Импорты для Angular Material Dialog
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../users.service';
import { MatSelectModule } from '@angular/material/select';
import { UserPositionEnum, UserRoleEnum } from '../../../models/user.models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-update',
  standalone: true,
  // 👇 Добавляем модули Material Design для красивой формы
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatDialogTitle,
    TranslatePipe,
  ],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  profileForm: FormGroup;
  errorMessage = '';

  roleOptions = [
    { value: UserRoleEnum.USER, viewValue: 'Пользователь' },
    { value: UserRoleEnum.ADMIN, viewValue: 'Администратор' },
  ];

  positionOptions = [
    { value: UserPositionEnum.MANAGER, viewValue: 'Управляющий' },
    { value: UserPositionEnum.ARCHITECT, viewValue: 'Архитектор' },
    { value: UserPositionEnum.CONSTRUCTOR, viewValue: 'Конструктор' },
    { value: UserPositionEnum.ENGINEER, viewValue: 'Инженер' },
  ];

  private fb = inject(FormBuilder);
  private userService = inject(UsersService);

  // 👇 Инжектируем сервисы для работы с диалогом
  private dialogRef = inject(MatDialogRef<CreateUserComponent>);
  public data: { id: string } = inject(MAT_DIALOG_DATA);

  constructor() {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required]],
      role: ['', [Validators.required]],
      position: ['', [Validators.required]],
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.userService.createUser(this.profileForm.value).subscribe({
      next: (newUser) => {
        // 👇 Закрываем окно и передаем обновленные данные назад
        this.dialogRef.close(newUser);
      },
      error: (err) => {
        this.errorMessage = 'Произошла ошибка при обновлении профиля.';
        console.error(err);
      },
    });
  }

  onCancel(): void {
    // 👇 Просто закрываем окно без передачи данных
    this.dialogRef.close();
  }
}
