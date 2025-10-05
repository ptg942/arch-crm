import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // 👈 Укажите ваш URL
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {}

  // Метод для входа в систему
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          // Сохраняем токен в localStorage при успешном логине
          this.setToken(response.access_token);
        })
      );
  }

  // Метод для выхода
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    // Здесь можно также перенаправить пользователя на страницу входа
  }

  // Сохранение токена
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Получение токена
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Проверка, авторизован ли пользователь
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
