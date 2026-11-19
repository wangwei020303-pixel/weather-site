# AERO — Weather Intelligence Hub

A full-stack weather intelligence portal and automated extreme-weather monitoring pipeline built with **React 19, TypeScript, Vite, Tailwind CSS, and Node.js**.

## Key Features

- **Global Meteorological Data Index**: Curated bilingual (EN/ZH) hub aggregating synoptic NWP models (GFS / ECMWF), satellite imagery, radar, marine/aviation wind vectors, and atmospheric research sources.
- **Automated Weather Ingestion & Archiving (`scripts/monitor.js`)**:
  - Polls real-time station observations across 17 monitored cities.
  - Archives hourly weather records into structured daily **CSV** and **JSON** time-series files under `public/history/YYYY/YYYYMMDD/`.
- **Extreme-Event Detection & Alerting**:
  - Rule-based severity engine tracking rapid feels-like temperature drops (orange/red thresholds), extreme cold alerts, and strong northerly wind advisories.
  - Deduplicated severity-escalation notifications via PushPlus / webhook integrations with quiet-hours handling.
- **AI Weather Briefings & Assistant**:
  - Batch-generates concise bilingual weather briefings powered by Gemini (`gemini-2.5-flash`).
  - Interactive in-app weather assistant (`AIChat`) grounded in live `weather-status.json` snapshots and the meteorological tool directory.
- **Automated CI/CD Pipeline (`.github/workflows/weather-cron.yml`)**:
  - Designed for hourly scheduled data updates, static site builds, and incremental history persistence on `gh-pages`.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Lucide React
- **Monitoring & Automation**: Node.js (ESM), GitHub Actions, QWeather API, Google Gemini API / DeepSeek API

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env

# 3. Start the Vite dev server
npm run dev

# 4. Run the weather monitoring & archiving script
node scripts/monitor.js
```

## Environment Variables

See [`.env.example`](.env.example) for required keys (`QWEATHER_KEY`, `GOOGLE_API_KEY`, `PUSHPLUS_TOKEN`, and optional frontend proxy / API endpoints).

## License

Apache-2.0
