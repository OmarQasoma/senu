import { Link } from 'react-router'
import useWatchlist from '../hooks/useWatchlist.js'
import { toggleWatchlist } from '../storage/localStorage.js'
import './MovieCard.css'

function MovieCard({ movie }) {
  const isInWatchlist = useWatchlist(movie.id)

  const year = movie.release_date?.slice(0, 4) || 'Unknown year'

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  function handleWatchlist() {
    toggleWatchlist(movie)
  }

  return (
    <article className="movie-card">
      <Link
        className="movie-card-link"
        to={`/movie/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
      >
        {movie.poster_path ? (
          <img
            className="movie-card-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="movie-card-poster movie-card-placeholder">
            No poster available
          </div>
        )}

        <h3>{movie.title}</h3>
      </Link>

      <p className="movie-card-meta">
        <span>{year}</span>

        <span className="movie-card-rating">
          <span aria-hidden="true">★</span> {rating}
        </span>
      </p>

      <button
        className="movie-card-watchlist"
        type="button"
        onClick={handleWatchlist}
      >
        {isInWatchlist
          ? '− Remove'
          : '+ Add'}
      </button>
    </article>
  )
}

export default MovieCard
