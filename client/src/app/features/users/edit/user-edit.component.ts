import { Component, OnInit, inject } from '@angular/core';
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
import { UserStatusEnum } from '../../../models/user.models';

@Component({
  selector: 'app-user-edit',
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
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  profileForm: FormGroup;
  userId: string;
  isLoading = true;
  errorMessage = '';

  statusOptions = [
    { value: UserStatusEnum.NEW, viewValue: 'Новый' },
    { value: UserStatusEnum.ACTIVE, viewValue: 'Активный' },
    { value: UserStatusEnum.BLOCKED, viewValue: 'Заблокирован' },
  ];

  private fb = inject(FormBuilder);
  private userService = inject(UsersService);

  // 👇 Инжектируем сервисы для работы с диалогом
  private dialogRef = inject(MatDialogRef<UserEditComponent>);
  public data: { id: string } = inject(MAT_DIALOG_DATA);

  constructor() {
    this.userId = this.data.id; // 👈 Получаем ID из переданных данных
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (!this.userId) {
      this.errorMessage = 'ID пользователя не найден.';
      this.isLoading = false;
      return;
    }

    // Загружаем данные пользователя
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.profileForm.patchValue(user);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Не удалось загрузить данные профиля.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
      next: (updatedUser) => {
        // 👇 Закрываем окно и передаем обновленные данные назад
        this.dialogRef.close(updatedUser);
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
