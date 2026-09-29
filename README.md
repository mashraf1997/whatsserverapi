# whatsserverapi

A lightweight **WhatsApp gateway server** built on [Baileys](https://github.com/WhiskeySockets/Baileys) and Express. It manages WhatsApp instances, exposes QR codes for pairing, reads groups, and sends messages over a simple HTTP API backed by MySQL.

## Requirements

- Node.js 18+
- MySQL database

## Setup

```bash
git clone https://github.com/mashraf1997/whatsserverapi.git
cd whatsserverapi
npm install

cp .env.example .env   # then edit .env with your database credentials
npm start
```

The server listens on the port given by `PORT` (default `8000`) and prints `WAZIPER IS LIVE` once ready.

## Configuration

All configuration comes from environment variables (loaded from `.env` via `dotenv`). See [`.env.example`](./.env.example) for the full list.

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `8000` | HTTP port |
| `DEBUG` | `false` | Verbose logging |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_USER` | `root` | MySQL user |
| `DB_PASSWORD` | _(empty)_ | MySQL password |
| `DB_NAME` | _(empty)_ | Database name |
| `DB_CHARSET` | `utf8mb4` | Connection charset |
| `DB_CONNECTION_LIMIT` | `100` | Pool size |
| `DB_MULTIPLE_STATEMENTS` | `false` | Allow stacked queries (leave off) |
| `CORS_ORIGIN` | `*` | Allowed CORS origin |

> **Security:** never commit `.env` or real credentials. In production, set `CORS_ORIGIN` to your dashboard's origin instead of `*`, and keep `DB_MULTIPLE_STATEMENTS=false`.

## API

Every endpoint takes `access_token` and (except `/`) `instance_id` as query parameters. `access_token` is validated against the `sp_team` table before the request is served.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check |
| `GET` | `/instance` | Return info about a WhatsApp instance |
| `GET` | `/get_qrcode` | Return the pairing QR code for an instance |
| `GET` | `/get_groups` | List the groups the instance belongs to |
| `GET` | `/logout` | Log the instance out |
| `POST` | `/send_message` | Send a message through the instance |

Example:

```bash
curl "http://localhost:8000/get_qrcode?access_token=YOUR_TOKEN&instance_id=YOUR_INSTANCE"
```

## Project structure

```
app.js              HTTP routes
config.js           Environment-driven configuration
waziper/
  waziper.js        Instance lifecycle, messaging and scheduling
  common.js         Database helpers and utilities
```

## License

[MIT](./LICENSE)
