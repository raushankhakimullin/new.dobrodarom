---
name: Dobrodarom project
description: Architecture decisions and integration details for the Добро Даром charitable foundation React app
---

# Dobrodarom project

## CloudPayments
- Public key: stored in `artifacts/dobrodarom/src/components/DonateWidget.tsx` as `CP_PUBLIC_ID`
- Script loaded in `artifacts/dobrodarom/index.html` via `<script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js">`
- Widget is a floating FAB (bottom-right) that opens a modal; supports one-time and recurrent (monthly) payments
- The `window.cp` global is typed via `declare global` in DonateWidget.tsx

## Events / Social Feeds
- Events page: `/events` — fetches from `/leyka/events_public.json` (proxied to live dobrodarom.ru site)
- Donations feed on Reports page: `/leyka/donations_public.json` (same proxy)
- Vite proxy configured in `artifacts/dobrodarom/vite.config.ts`: `/leyka` → `https://www.dobrodarom.ru`
- Telegram channel: @gooddarom | VK group: fund.dobrodarom (vk.ru/fund.dobrodarom)
- For production deployment, the proxy target must be reachable or replaced with a dedicated API endpoint

## GitHub
- Target repo: https://github.com/raushankhakimullin/dobrodarom.git
- Initial push done via GitHub Tree API through Replit connector (repo was empty)
- For future pushes: connector is `conn_github_01M07CJDCPMF5K300ZZQ76T1J6` (added)
- Cannot use raw git push — connector doesn't expose raw OAuth token; use GitHub REST API via connector or the `github-push.mjs` script pattern

**Why:** GitHub connector proxies auth headers but never exposes the raw token; the Tree API approach (create blob → create tree → create commit → update ref) is the correct path for programmatic pushes.

**How to apply:** When pushing future changes, use the pattern in the lost script: read files, create tree with `content` fields (no separate blob creation needed for text files), create commit with `parents: [currentSha]`, PATCH the ref.
