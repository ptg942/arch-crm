import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  // Базовый URL вашего API. Лучше вынести его в environment файлы.
  private apiUrl = 'http://localhost:3000/api/users';

  // GET /api/users - Получить список всех пользователей
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // GET /api/users/{id} - Получить пользователя по ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // POST /api/users - Создать нового пользователя
  // Omit<User, 'id'> означает "все поля из User, кроме id"
  createUser(user: Omit<User, '_id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // PATCH /api/users/{id} - Обновить пользователя
  // Partial<User> означает, что можно передать не все поля, а только часть
  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, userData);
  }

  // DELETE /api/users/{id} - Удалить пользователя
  // Обычно DELETE-запросы не возвращают тело ответа, поэтому Observable<void>
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
