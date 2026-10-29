# NFL Stats & Fantasy Drafter

A responsive vanilla JavaScript web application for searching NFL player statistics, comparing two players head-to-head, and building a fantasy-football roster. Built as a web development school project and refined for my portfolio.

## Highlights

- Searches 2025 NFL regular-season player data from the SportsData.io API
- Calculates approximate PPR fantasy points from passing, rushing, receiving, and turnover stats
- Compares two players across key stat categories
- Lets users draft and manage a personal fantasy roster
- Caches API data in `localStorage` to reduce repeat requests

## Tech stack

HTML, CSS, vanilla JavaScript, and a small Node.js server that keeps the API key out of browser code.

## Run locally

1. Install Node.js 18 or newer.
2. Copy `.env.example` to `.env` and add your SportsData.io NFL API key.
3. Run `npm start` and open `http://localhost:3000`.

## Note on API keys

The local server reads the API key from `.env` and proxies the API request, so the browser and public repository never receive the credential. Use an environment variable with your hosting provider when deploying.
