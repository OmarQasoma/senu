import { Link } from 'react-router'
import './MovieCard.css'

function MovieCard({ movie, mediaType = 'movie', watchlist, onToggleWatchlist }) {
  const isInWatchlist = watchlist.some(
    savedMovie => (
      savedMovie.id === movie.id &&
      (savedMovie.media_type || 'movie') === mediaType
    )
  )
  const title = mediaType === 'tv' ? movie.name : movie.title
  const date = mediaType === 'tv' ? movie.first_air_date : movie.release_date
  const year = date?.slice(0, 4) || 'Unknown year'

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  function handleWatchlist() {
    onToggleWatchlist({ ...movie, media_type: mediaType })
  }

  return (
    <article className="movie-card">
      <Link
        className="movie-card-link"
        to={`/${mediaType}/${movie.id}`}
        aria-label={`View details for ${title}`}
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

        <h3>{title}</h3>
      </Link>

      <p className="movie-card-meta">
        <span>{year}</span>

        <span className="movie-card-rating">
          <span aria-hidden="true">★</span> {rating}
        </span>
      </p>

      <button
        className={`movie-card-watchlist ${isInWatchlist ? 'movie-card-watchlist-active' : ''}`}
        type="button"
        onClick={handleWatchlist}
        aria-label={`${isInWatchlist ? 'Remove' : 'Add'} ${title} ${isInWatchlist ? 'from' : 'to'} watchlist`}
        aria-pressed={isInWatchlist}
      >
        {isInWatchlist
          ? '− Remove'
          : '+ Add'}
      </button>
    </article>
  )
}

export default MovieCard
