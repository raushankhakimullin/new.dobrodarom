# Деплой сайта «Добро Даром» на Beget

## Архитектура

```
Replit (разработка)
  └─ git push → GitHub (raushankhakimullin/new.dobrodarom)
                  └─ GitHub Actions (deploy-beget.yml)
                         └─ pnpm build → dist/public/
                                └─ rsync → Beget (dobrodarom.ru)
```

---

## Данные вашего хостинга

| Параметр | Значение |
|----------|----------|
| Логин | `raushan777` |
| SSH-хост | `raushan777.beget.tech` |
| Путь деплоя | `/home/raushan777/dobrodarom.ru/public_html` |
| SSH-порт | `22` |

---

## Шаг 1 — Сгенерировать SSH-ключ и добавить на Beget

> На shared-хостинге Beget нет раздела «SSH-ключи» в панели (это только для VPS/Облака).
> Публичный ключ добавляется вручную через SSH или файловый менеджер.

### 1.1 Сгенерировать пару ключей (на вашем компьютере или в любом терминале)

```bash
ssh-keygen -t ed25519 -C "github-deploy-dobrodarom" -f ~/.ssh/dobrodarom_deploy
```

Появятся два файла:
- `~/.ssh/dobrodarom_deploy` — **приватный ключ** (добавим в GitHub Secret)
- `~/.ssh/dobrodarom_deploy.pub` — **публичный ключ** (добавим на Beget)

### 1.2 Добавить публичный ключ на Beget

**Вариант А — Через файловый менеджер Beget (cp.beget.com):**

1. Войдите в `cp.beget.com` → **Файловый менеджер**
2. Перейдите в папку `/home/raushan777/.ssh/` (создайте, если нет)
3. Откройте или создайте файл `authorized_keys`
4. Вставьте содержимое `dobrodarom_deploy.pub` с новой строки
5. Сохраните файл
6. Установите права: файловый менеджер → ПКМ → **Права доступа** → `600` на `authorized_keys`, `700` на `.ssh`

**Вариант Б — Через SSH (если пароль уже работает):**

```bash
# Скопируйте публичный ключ на сервер:
ssh-copy-id -i ~/.ssh/dobrodarom_deploy.pub raushan777@raushan777.beget.tech

# Или вручную:
cat ~/.ssh/dobrodarom_deploy.pub | ssh raushan777@raushan777.beget.tech \
  "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### 1.3 Проверить подключение

```bash
ssh -i ~/.ssh/dobrodarom_deploy raushan777@raushan777.beget.tech "echo OK"
# Должно вывести: OK
```

---

## Шаг 2 — Добавить 4 Secrets в GitHub

Репозиторий: `raushankhakimullin/new.dobrodarom`
**Settings → Secrets and variables → Actions → New repository secret**

| Название Secret | Значение |
|----------------|---------|
| `BEGET_HOST` | `raushan777.beget.tech` |
| `BEGET_USERNAME` | `raushan777` |
| `BEGET_SSH_KEY` | Весь текст из файла `~/.ssh/dobrodarom_deploy` (включая строки `-----BEGIN` и `-----END`) |
| `BEGET_DEPLOY_PATH` | `/home/raushan777/dobrodarom.ru/public_html` |

---

## Шаг 3 — Добавить GitHub Actions workflow

> Replit не может создать файл в `.github/workflows/` из-за ограничений OAuth.
> Нужно сделать это **один раз** через браузер GitHub.

### Вариант А — Через GitHub Web UI (проще)

1. Откройте [github.com/raushankhakimullin/new.dobrodarom](https://github.com/raushankhakimullin/new.dobrodarom)
2. **Add file → Create new file**
3. В поле имени файла введите: `.github/workflows/deploy-beget.yml`
4. Вставьте содержимое ниже:

```yaml
name: Build & Deploy to Beget (dobrodarom.ru)

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build frontend
        run: PORT=3000 BASE_PATH=/ pnpm --filter @workspace/dobro-darom run build
        env:
          NODE_ENV: production

      - name: Create .htaccess in dist
        run: |
          cat > artifacts/dobro-darom/dist/public/.htaccess << 'HTACCESS'
          AddDefaultCharset UTF-8
          AddType application/javascript .js .mjs
          AddType text/css .css
          AddType image/svg+xml .svg
          AddType image/webp .webp
          AddType font/woff2 .woff2

          Header always set X-Content-Type-Options "nosniff"
          Header always set X-Frame-Options "SAMEORIGIN"
          Header always set Referrer-Policy "strict-origin-when-cross-origin"

          <FilesMatch "\.(js|css|woff2|jpg|jpeg|png|svg|webp|gif|ico)$">
            Header set Cache-Control "public, max-age=31536000, immutable"
          </FilesMatch>
          <FilesMatch "^index\.html$">
            Header set Cache-Control "no-cache, no-store, must-revalidate"
          </FilesMatch>

          <IfModule mod_deflate.c>
            AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
          </IfModule>

          <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule ^ index.html [L]
          </IfModule>
          HTACCESS

      - name: Setup SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.BEGET_SSH_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H "${{ secrets.BEGET_HOST }}" >> ~/.ssh/known_hosts 2>/dev/null || true

      - name: Deploy via rsync
        run: |
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/deploy_key -o StrictHostKeyChecking=no -p 22" \
            artifacts/dobro-darom/dist/public/ \
            "${{ secrets.BEGET_USERNAME }}@${{ secrets.BEGET_HOST }}:${{ secrets.BEGET_DEPLOY_PATH }}/"

      - name: Cleanup SSH key
        if: always()
        run: rm -f ~/.ssh/deploy_key
```

5. Нажмите **Commit changes**

### Вариант Б — Через Git push с компьютера

```bash
git clone https://github.com/raushankhakimullin/new.dobrodarom.git
cd new.dobrodarom
mkdir -p .github/workflows
# Скопируйте workflow из Replit или вставьте YAML выше
git add .github/workflows/deploy-beget.yml
git commit -m "ci: add Beget deploy workflow"
git push origin main
```

---

## Шаг 4 — Запустить деплой

После шагов 1–3 деплой запускается **автоматически** при каждом пуше в `main`.

Запуск вручную (первый раз):
- GitHub → **Actions → Build & Deploy to Beget → Run workflow → Run workflow**

Время деплоя: **~3–5 минут**.

Проверьте результат: **https://www.dobrodarom.ru**

---

## Шаг 5 — DNS (если ещё не настроен)

В Beget: **Домены → dobrodarom.ru → DNS-записи**

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | IP вашего сервера Beget |
| A | www | IP вашего сервера Beget |

IP сервера: Beget → **Аккаунт → Параметры FTP** → колонка **Хост** (это `raushan777.beget.tech`, но нужен IP-адрес для A-записи).

> Узнать IP: `nslookup raushan777.beget.tech`

Обновление DNS: 15 минут — 48 часов.

---

## Что деплоится

| Что | Куда |
|-----|------|
| `artifacts/dobro-darom/src/` | Исходный код React (собирается Vite) |
| `artifacts/dobro-darom/dist/public/` | **Результат → Beget public_html** |
| `.htaccess` | Создаётся в CI автоматически (SPA-роутинг + кеш) |

Любой пуш в `main` → сборка + деплой автоматически (~3–5 мин).
