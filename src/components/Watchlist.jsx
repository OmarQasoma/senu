import { useOutletContext } from 'react-router'
import MovieCard from './MovieCard.jsx'

function Watchlist() {
  const { watchlist, onToggleWatchlist } = useOutletContext()

  return (
    <main>
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Watchlist