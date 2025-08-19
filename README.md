# ⚽ Football Statistics

Веб-приложение для управления футбольными игроками: добавление, просмотр статистики и удаление игроков.  
Реализована авторизация, сортировка игроков, а также отдельная страница для детальной информации о каждом игроке.

## Основной функционал
- Авторизация (Firebase Auth).
- Добавление нового игрока с фото, позицией и статистикой.
- Просмотр списка игроков с сортировкой.
- Страница игрока с информацией о нем и статистикой.
-  Удаление игрока.
- Линтинг и автоформатирование (ESLint + Prettier).
- End-to-End тестирование (Playwright).
- CI/CD пайплайн на GitLab (линтинг, тесты, деплой на GitLab Pages).

## Стек технологий
- **Frontend**: React + TypeScript + Vite
- **State management**: Redux Toolkit
- **UI**: Tailwind CSS + shadcn/ui
- **Backend/DB**: Firebase (Authentication + Firestore)
- **Тестирование**: Playwright
- **Качество кода**: ESLint, Prettier
- **CI/CD**: GitLab CI/CD (Pages)


## Запуск проекта
```bash
# Установка зависимостей
npm install

# Запуск дев-сервера
npm run dev

# Линтинг
npm run lint

# E2E тесты
npx playwright test

