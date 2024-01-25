![script logo](https://github.com/lzt-upgrade/lzt-upgrade/raw/master/public/static/img/lzt-upgrade.svg "logo")

<h1 align = center>LZT Stats</h1>

[![Crowdin](https://badges.crowdin.net/lzt-stats/localized.svg)](https://crowdin.com/project/lzt-stats)

<p align="center">
  <a href="#user-content-1-доступный-функционал">Функционал</a>
  •
  <a href="#user-content-2-установка-скрипта">Установка</a>
</p>

**LZT Stats** — скрипт, показывающий детальную статистику вашей активности на форуме **[Lolzteam](https://zelenka.guru)**

## 1. Доступный функционал
### 1.1. Статистика за год/месяц/неделю/день
- Статистика сообщений:
  - отправлено
  - изменено
  - удалено
- Статистика комментариев:
  - отправлено
  - изменено
  - удалено
- Статистика сообщений в чате:
  - отправлено
  - изменено
  - удалено
- Статистика тем
  - создано
  - изменено
  - удалено
- Статистика симпатий
  - получено
  - поставлено
- Статистика поставленных лайков
- Статистика участий в розыгрышах (без учета АУ)
- Статистика отправленных репортов
- Статистика пройденных опросов
- Статистика сообщений в ЛС:
  - отправлено
  - изменено
- Статистика полученных баллов

### 1.2. Чат
В этой владке хранится история всех отправленных вами сообщений в чате

### 1.3 Настройки
- Сохранение собранных данных на ПК
- Загрузка собранных данных с ПК
- Альтернативный формат подсчета времени

## 2. Установка скрипта
1. Установите расширение **[Tampermonkey](https://www.tampermonkey.net/)**
2. **[«Установите Скрипт»](https://github.com/lzt-upgrade/lzt-stats/raw/master/dist/lzt-stats.user.js)**

## 3. Как собрать расширение?
1. Установите NodeJS 18+
2. Установите зависимости:
```bash
npm i
```
3. Сборка расширения:

   3.0. Все версии сразу:
   ```bash
   npm run build
   ```

   3.1. Только обычная версии:
   ```bash
   npm run build:default
   ```

   3.2. Только мин. версии:
   ```bash
   npm run build:min
   ```

4. Установка pre-commit хука:
   ```bash
   npm run prepare
   ```

## Политика использования
Используя скрипт, вы соглашаетесь с тем, что:
1. Скрипт может отслеживать содержимое запросов на форуме (содержимое запросов не сохраняется и никуда не передается)
2. Скрипт может инициировать запросы к Zelenka API при предоставление API-токена (токен никуда не передается и хранится локально в вашем браузере)
3. Скрипт может инициировать запросы к LZT Upgrade API при включение облачной синхронизации

![script menu](https://github.com/ilyhalight/lzt-upgrade/raw/master/public/static/img/screenshot.png "menu")