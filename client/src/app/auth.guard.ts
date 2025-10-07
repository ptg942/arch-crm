import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Убедитесь, что путь к сервису верный

export const authGuard: CanActivateFn = (route, state) => {
  // 1. Получаем доступ к сервисам с помощью inject
  const authService = inject(AuthService);
  const router = inject(Router);

  // 2. Проверяем, аутентифицирован ли пользователь
  if (authService.isAuthenticated()) {
    return true; // ✅ Пользователь вошел в систему, разрешаем доступ
  }

  // 3. Если пользователь не вошел, перенаправляем его на страницу входа
  router.navigate(['/login']);
  return false; // 🛑 Запрещаем доступ к текущему маршруту
};
