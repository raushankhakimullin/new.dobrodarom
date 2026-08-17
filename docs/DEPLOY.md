# Деплой сайта «Добро Даром» на Beget

## Архитектура

```
GitHub (исходный код)
  └─ push → main
         └─ GitHub Actions (.github/workflows/deploy-beget.yml)
                └─ pnpm build (статические файлы в dist/public)
                       └─ rsync → Beget (dobrodarom.ru/public_html)
```

---

## 1. Настройка Beget

### 1.1 SSH-доступ

1. В панели Beget (cp.beget.com) → **SSH-ключи**
2. Создайте SSH-ключ (или загрузите публичный ключ) — кнопка **Добавить**
3. Скопируйте **приватный ключ** (понадобится для GitHub Secret)
4. IP/hostname сервера — на странице **Серверы** → колонка **IP**

### 1.2 Путь деплоя

В панели Beget → **Сайты** → найдите `dobrodarom.ru`:
- Путь обычно: `/home/<ваш_логин>/dobrodarom.ru/public_html`
- Например: `/home/dobrodarom/dobrodarom.ru/public_html`

### 1.3 Убедитесь, что mod_rewrite включён

Файл `.htaccess` (создаётся автоматически при деплое) требует `mod_rewrite`.
В Beget он включён по умолчанию на всех тарифах.

---

## 2. Настройка GitHub Secrets

В репозитории `raushankhakimullin/new.dobrodarom`:
**Settings → Secrets and variables → Actions → New repository secret**

| Название Secret  | Значение                                    |
|-----------------|---------------------------------------------|
| `BEGET_HOST`    | IP вашего сервера Beget (например: `1.2.3.4`) |
| `BEGET_USERNAME`| Логин SSH (из панели Beget)                 |
| `BEGET_SSH_KEY` | Весь приватный ключ (включая BEGIN/END строки) |
| `BEGET_DEPLOY_PATH` | `/home/<логин>/dobrodarom.ru/public_html` |

---

## 3. Добавление GitHub Actions Workflow

> **Важно:** Replit не может автоматически создать файл в `.github/workflows/`
> из-за ограничений OAuth. Нужно сделать это вручную один раз.

### Вариант А — Через GitHub Web UI (проще)

1. Откройте [github.com/raushankhakimullin/new.dobrodarom](https://github.com/raushankhakimullin/new.dobrodarom)
2. Нажмите **Add file → Create new file**
3. В поле имени файла введите: `.github/workflows/deploy-beget.yml`
4. Вставьте содержимое из `.github/workflows/deploy-beget.yml` в этом проекте
5. Нажмите **Commit changes**

### Вариант Б — Через Git push с вашего компьютера

```bash
git clone https://github.com/raushankhakimullin/new.dobrodarom.git
cd new.dobrodarom
# Скопируйте файл .github/workflows/deploy-beget.yml из Replit
git add .github/workflows/deploy-beget.yml
git commit -m "ci: add Beget deploy workflow"
git push origin main
```

---

## 4. Первый деплой

1. После добавления workflow и secrets — пуш в `main` автоматически запустит деплой
2. Или вручную: **Actions → Build & Deploy to Beget → Run workflow**
3. Проверьте результат по адресу `https://www.dobrodarom.ru`

---

## 5. DNS (если ещё не настроен)

В Beget: **Домены → dobrodarom.ru → DNS-записи**

| Тип  | Имя | Значение              |
|------|-----|-----------------------|
| A    | @   | IP вашего сервера     |
| A    | www | IP вашего сервера     |
| CNAME| www | dobrodarom.ru.        |

Обновление DNS занимает от 15 минут до 48 часов.

---

## Что деплоится

| Папка в репозитории | Куда идёт |
|---------------------|-----------|
| `artifacts/dobro-darom/src/` | Исходный код React (собирается) |
| `artifacts/dobro-darom/dist/public/` | **Результат сборки → Beget public_html** |
| `.htaccess` | Создаётся в CI автоматически |

## Обновление сайта

Любой пуш в ветку `main` запускает сборку и деплой автоматически.
Время деплоя: ~3-5 минут.
