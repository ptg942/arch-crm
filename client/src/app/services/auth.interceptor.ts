import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router); // 💡 Добавляем Router для перенаправления
  const authToken = authService.getToken();

  let authReq = req;

  // Если токен есть, клонируем запрос и добавляем заголовок Authorization
  if (authToken) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }

  // Передаем запрос (оригинальный или с заголовком) дальше
  // и добавляем обработку ответа через .pipe()
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Проверяем, является ли ошибка ошибкой авторизации
      if (error.status === 401) {
        // Если да, то:
        // 1. Выполняем выход (очищаем токен и данные пользователя)
        authService.logout();

        // 2. Перенаправляем на страницу входа
        router.navigate(['/login']);
      }

      // Возвращаем ошибку дальше, чтобы ее могли обработать другие части приложения
      return throwError(() => error);
    })
  );
};
