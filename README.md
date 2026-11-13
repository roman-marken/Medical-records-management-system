# Medical Records Management System

Простий вебзастосунок приватної клініки на React, TypeScript, Vite та React Router.

## Запуск

```bash
npm install
npm run dev
```

Для production-збірки:

```bash
npm run build
npm run preview
```

## Сторінки

- `/` — головна
- `/doctors` — список лікарів, фільтр за спеціалізацією та сортування
- `/doctors/:doctorId` — профіль лікаря
- `/appointments` — доступні записи
- `/appointments/:appointmentId` — деталі та форма запису
- `/my-appointments` — особисті записи пацієнта
- `/login` та `/register` — вхід і реєстрація

Маршрути побудовані через `createBrowserRouter`, `RouterProvider`, вкладені layouts та `Outlet`. Фільтри зберігаються в URL. Loader-и завантажують лікарів і записи, action-и обробляють форми. Неавторизований пацієнт повертається на запитану сторінку після входу. Дати в минулому відхиляються.

Це навчальний frontend-прототип: приклади лікарів і доступних годин задані в коді, а авторизація та записи зберігаються у `localStorage`. Для реального використання потрібен сервер із базою даних та справжньою автентифікацією.

