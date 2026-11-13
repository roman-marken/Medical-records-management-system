# Medical Records Management System

Навчальний прототип вебзастосунку приватної клініки на React, TypeScript, Vite та React Router.

## Запуск

```bash
npm install
npm run dev
```

Production-збірка: `npm run build`.

## Сторінки

- `/` — головна
- `/doctors` — список лікарів з фільтрацією та сортуванням
- `/doctors/:doctorId` — профіль лікаря
- `/appointments` — вільні записи
- `/appointments/:appointmentId` — деталі та створення запису
- `/my-appointments` — особистий кабінет пацієнта
- `/login` і `/register` — авторизація та реєстрація

Використано `createBrowserRouter`, вкладені layouts, loaders/actions, `useParams`, `useSearchParams`, `Link`, `NavLink` та обробку помилок. Демонстраційні дані й авторизація зберігаються в браузері; для реальної клініки потрібно підключити сервер і базу даних.

