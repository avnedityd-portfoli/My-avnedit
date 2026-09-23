# AVNEDIT on Replit

## Run

The project is a React 18 website built with Vite.

- Install dependencies from `package.json`.
- Start the development server with `npm run dev`.
- The Vite server listens on `0.0.0.0:5000` for Replit Preview.

## Optional order integration

The website itself runs without credentials. Google Sheets order storage requires a
server-side `GOOGLE_SHEETS_WEBHOOK_URL` secret and an order API endpoint. The imported
project currently documents that endpoint but does not include its implementation.