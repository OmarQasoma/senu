<div align="center">

<img src="./src/assets/senu-logo.png" alt="SENU" width="190" />

### Movie discovery made simple.

SENU is a React movie application powered by the TMDb API.

`React` · `JavaScript` · `Vite` · `React Router` · `TMDb API`

</div>

---

## Overview

SENU is a data-driven movie discovery application developed as part of my web application development studies.

The project focuses on working with external APIs, reusable React components, routing, search, filtering, pagination and state management.

---

## Features

| Feature | Status |
| --- | --- |
| Popular movies | ✅ |
| Movie search | ✅ |
| Genre filtering | ✅ |
| Movie details | ✅ |
| Load More pagination | ✅ |
| Loading & error handling | ✅ |
| Responsive movie grid | ✅ |
| Watchlist | 🚧 In development |
| Top Rated movies | 🚧 In development |
| Soundtrack integration | 📌 Planned |

---

## Movie Discovery

Users can browse movies and filter them by genre:

`All` · `Action` · `Comedy` · `Drama` · `Horror` · `Animation`

The genre filter uses TMDb movie data and updates the displayed results without leaving the Home page.

---

## Search

Movie search is available directly from the navigation bar.

The flow is:

`Search → Home → movieApi.js → TMDb API → Results`

This allows search results and popular movies to reuse the same components and layout.

---

## Movie Details

Clicking a movie opens its dedicated details page.

Each movie can display information such as:

- Poster and backdrop
- Title
- Release year
- Rating
- Overview

A soundtrack section is planned for this page using a secondary API.

---

## API

TMDb is the main data source for SENU.

API logic is separated from the UI and handled through:

`src/services/movieApi.js`

Current API functionality includes:

- Popular movies
- Search
- Genre filtering
- Movie details

The general data flow is:

`React UI → API Service → TMDb → JSON → State → Components`

---

## Main Views

| View | Purpose |
| --- | --- |
| **Home** | Popular movies, search and genre filtering |
| **Movie Details** | Detailed information about a selected movie |
| **Watchlist** | Movies saved by the user |
| **Top Rated** | Highly rated movies |

---

## Main Components

**Navbar**  
Navigation and movie search.

**Hero**  
Displays the featured movie from the current results.

**MovieCard**  
Reusable card for poster, title, year and rating.

**GenreButtons**  
Controls movie filtering by genre.

**MovieDetails**  
Displays detailed information for a selected movie.

---

## Tech Stack

| | |
| --- | --- |
| Frontend | React, JavaScript, CSS |
| Build Tool | Vite |
| Routing | React Router |
| Movie Data | TMDb API |
| State | React `useState` / `useEffect` |
| Planned | Redux Toolkit, Local Storage, Soundtrack API |

---

## Run Locally

Install dependencies:

```bash
npm install
