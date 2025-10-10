import { Component, OnInit, inject, signal, computed } from '@angular/core'; // 👈 Добавляем signal и computed
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsersService } from './users.service';
import { User } from '../../models/user.models';

// Angular Material Imports
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// import { MatLabel } from '@angular/material/form-field-module.d';
// import { MatFormField } from '@angular/material/form-field.d';
import { MatInput } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { UserStatusPipe } from '../../pipes/userStatus.pipe';

// Определяем интерфейс для нашего состояния
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
    RouterLink,
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    // MatLabel,
    // MatFormField,
    MatInput,
    MatChipsModule,
    UserStatusPipe,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  visible = true;

  // 1. Создаем один сигнал для всего состояния компонента
  private state = signal<UsersState>({
    users: [],
    isLoading: true,
    error: null,
  });

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
        console.error('Ошибка при загрузке пользователей:', err);
        // Обновляем состояние "произошла ошибка"
        this.state.set({
          users: [],
          isLoading: false,
          error: 'Не удалось загрузить пользователей',
        });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(id: string): void {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
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
}
