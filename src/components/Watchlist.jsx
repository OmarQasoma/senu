import { useState } from 'react'
import MovieCard from './MovieCard.jsx'
import { getWatchlist } from '../storage/localStorage.js'

function Watchlist() {
  const [movies, setMovies] = useState(() => getWatchlist())

function handleWatchlistChange() {
  setMovies(getWatchlist())
}

  return (
    <main>
      <h1>My Watchlist</h1>

      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Watchlist