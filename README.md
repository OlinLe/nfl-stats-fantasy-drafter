# NFL Stats & Fantasy Drafter

A full-stack web application for searching NFL players, comparing players head-to-head, and building a personal fantasy-football roster. Built as a web development school project and refined for my portfolio.

The app retrieves live 2025 NFL player data from SportsData.io through a custom Node.js backend, keeping the API key out of browser code. It calculates projected PPR fantasy points client-side from passing, rushing, receiving, and turnover statistics.

## Features

### Player Search

- Search NFL players from the 2025 regular season
- View each player's name, team, position, and key offensive statistics
- Automatically calculate approximate PPR fantasy points

### Head-to-Head Comparison

- Select up to two players for comparison
- Compare key stat categories side by side
- Highlight category winners and losers in green and red
- Smooth-scroll to the comparison section after selection

### Fantasy Roster Builder

- Draft and remove players from a personal roster
- Automatically update total projected fantasy points and player count
- Prevent duplicate roster entries
- Cache player-stat responses in `localStorage` for faster repeat searches and fewer API calls

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Custom Node.js HTTP server
- Native Node.js `fetch` for the external API request
- Custom `/api/player-season-stats` endpoint
- `.env` configuration for the API key

### External API

[SportsData.io NFL Player Season Stats](https://sportsdata.io/) (`2025REG`). Authentication is handled server-side with `SPORTSDATA_API_KEY`, so the key is never exposed to the browser or committed to Git.

## Run Locally

Requirements: Node.js 18 or newer and a SportsData.io NFL API key.

```bash
git clone git@github.com:OlinLe/nfl-stats-fantasy-drafter.git
cd nfl-stats-fantasy-drafter
cp .env.example .env
```

Open `.env` and replace the placeholder value:

```env
SPORTSDATA_API_KEY=your_api_key_here
```

Then start the application:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
