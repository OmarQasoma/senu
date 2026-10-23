import { useOutletContext } from 'react-router'
import MovieCard from '../components/MovieCard.jsx'
import './Watchlist.css'

function Watchlist() {
  const { watchlist, onToggleWatchlist } = useOutletContext()

  return (
    <main className="watchlist-page">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="watchlist-empty">No movies or TV shows added yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <MovieCard
              key={`${movie.media_type || 'movie'}-${movie.id}`}
              movie={movie}
              mediaType={movie.media_type || 'movie'}
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
