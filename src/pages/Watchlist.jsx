
import { useOutletContext } from 'react-router'
import MovieCard from '../components/MovieCard.jsx'

function Watchlist() {
  const { watchlist, changeWatchlist } = useOutletContext()
  return (
    <main>
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            // // Pass movie data and watchlist functions to MovieCard
            <MovieCard
              key={movie.id}
              movie={movie}
              watchlist={watchlist}
              onToggleWatchlist={changeWatchlist}
               />
          ))}
        </div>
      )}
    </main>
  )
}

export default Watchlist
