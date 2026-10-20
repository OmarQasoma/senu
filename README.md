# SENU

A React movie app developed as a final project for MA25 at Folkuniversitetet.

SENU uses the TMDb API to let users discover movies, view movie details and save a personal watchlist.

## Features

- Browse popular movies.
- Search for movies from the navigation bar.
- Filter movies by genre.
- Load more results.
- View a movie's poster, title, release year, rating, runtime and overview.
- Add and remove movies from the watchlist using the Hero or movie cards.
- Keep the watchlist after refreshing the page using localStorage.
- Show loading messages, errors and empty results.
- Adapt the layout to desktop and mobile screens.

## Pages

| Page | Hash route | Purpose |
| --- | --- | --- |
| Home | `/#/` | Popular movies, search and genre filtering |
| Movie Details | `/#/movie/:movieId` | More information about a selected movie |
| Watchlist | `/#/watchlist` | Saved movies with a remove button |

React Router handles navigation. `App` provides the shared Navbar and Footer, while `Outlet` displays the selected page.

## Built With

- React and JavaScript
- Vite
- React Router
- CSS
- TMDb API
- Browser localStorage

## Run Locally

You need Node.js, npm and a [TMDb API Read Access Token](https://developer.themoviedb.org/docs/authentication-application).

1. Open a terminal in the project folder and install dependencies:

   ```bash
   npm install
   ```

2. Create a file named `.env.local` in the project root, next to `package.json`:

   ```env
   TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token_here
   ```

   Replace the example value with your API Read Access Token. Paste only the token; the Vite configuration adds `Bearer` to the authorization header. `.env.local` is excluded from Git by `.gitignore`.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal. Restart the development server after changing your token.

## How the App Works

`Home` fetches movies through `movieApi.js` and passes each movie to `Hero` or `MovieCard` as a prop. `MovieDetails` reads the movie ID from the route and fetches that movie's details.

`App` keeps the shared watchlist in React state. The pages receive the list and toggle function through `Outlet` context, then pass them to the movie components as props. `localStorage.js` reads and saves the list in the browser.

The browser sends API requests to `/api/tmdb`. During development, Vite forwards those requests to TMDb and adds the access token.

## Project Structure

```text
src/
├── assets/          # Images and logo
├── components/      # UI components such as Navbar, Footer, Hero and MovieCard
├── pages/           # Page components
├── services/        # TMDb API requests
├── storage/         # Watchlist persistence
├── App.jsx          # Shared layout and watchlist state
├── main.jsx         # React entry point and router configuration
└── index.css        # Global styles
```

## Checks and Build

```bash
npm run lint
npm run build
npm run preview
```

`lint` checks the JavaScript and JSX. `build` creates the frontend files in `dist`. `preview` serves the build locally for checking.

When publishing to a static host, configure a backend or proxy for `/api/tmdb`. The development proxy is not included in the generated frontend files. See [Vite's proxy documentation](https://vite.dev/config/server-options#server-proxy).

## Manual Testing

1. Open Home and check that popular movies appear.
2. Search for a movie, select a genre and try Load More.
3. Open a movie and check its details.
4. Add movies using both the Hero and a movie card. Check that they appear in Watchlist.
5. Remove a saved movie and check that its card disappears from Watchlist.
6. Add a movie, refresh the page and check that it stays saved.

## Credits

- Developer: Omar Qasoma
- Class: MA25
- School: Folkuniversitetet
- Teacher: David Svensson
- Movie data and images: [TMDb](https://www.themoviedb.org/)

This product uses the TMDB API but is not endorsed or certified by TMDB.
