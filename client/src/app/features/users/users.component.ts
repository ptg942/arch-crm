import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { User } from '../../models/user.models';

// Angular Material Imports
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { UserStatusPipe } from '../../pipes/userStatus.pipe';
import { DialogService } from '../../services/dialog.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInput,
    MatChipsModule,
    UserStatusPipe,
    TranslatePipe,
    MatFormField,
    MatTooltipModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private translate = inject(TranslateService);
  visible = true;

  // 1. Создаем один сигнал для всего состояния компонента
  private state = signal<UsersState>({
    users: [],
    isLoading: true,
    error: null,
  });

  private dialogService = inject(DialogService);

  // 2. Создаем вычисляемые сигналы для удобного доступа в шаблоне
  users = computed(() => this.state().users);
  // isLoading: boolean = computed(() => this.state().isLoading);
  error = computed(() => this.state().error);

  dataSource = new MatTableDataSource<User>();
  isLoading = true;
  // 3. Определяем колонки как и раньше
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'status',
    'actions',
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Обновляем состояние "загрузка началась"
    this.state.update((current) => ({ ...current, isLoading: true }));

    this.usersService.getUsers().subscribe({
      next: (data) => {
        // Обновляем состояние "данные успешно загружены"
        this.state.set({ users: data, isLoading: false, error: null });
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.state.set({
          users: [],
          isLoading: false,
          error: this.translate.instant('USERS.LOAD_ERROR'),
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: string): void {
    const message = this.translate.instant('USERS.DELETE_CONFIRM');
    if (confirm(message)) {
      this.usersService.deleteUser(id).subscribe({
        next: () => {
          // После удаления обновляем список, убирая удаленного пользователя
          this.state.update((current) => ({
            ...current,
            users: current.users.filter((u) => u._id !== id),
          }));
        },
        error: (err) => {
          console.error('Ошибка при удалении пользователя:', err);
          // Можно добавить обработку ошибки удаления в state
        },
      });
    }
  }

  updateUser(userId: string): void {
    // Передаем ID пользователя в диалоговое окно
    const dialogSub = this.dialogService
      .openUpdateUserDialog(userId)
      .subscribe((updatedUser) => {
        // Если окно вернуло обновленного пользователя (т.е. не была нажата "Отмена")
        if (updatedUser) {
          // Обновляем пользователя в нашем состоянии
          this.state.update((current) => ({
            ...current,
            users: current.users.map((user) =>
              user._id === userId ? { ...user, ...updatedUser } : user
            ),
          }));
        }
        dialogSub.unsubscribe();
      });
  }

  createUser(): void {
    const dialogSub = this.dialogService
      .openCreateUserDialog()
      .subscribe((newUser) => {
        if (newUser) {
          this.state.update((current) => ({
            ...current,
            users: [newUser, ...current.users],
          }));
        }
        dialogSub.unsubscribe();
      });
  }
}
