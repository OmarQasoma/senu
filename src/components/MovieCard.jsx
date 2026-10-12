import { Link } from 'react-router'
import './MovieCard.css'

function MovieCard({ movie }) {
  const year = movie.release_date?.slice(0, 4) || 'Unknown year'

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  return (
    <article className="movie-card">
      <Link
        className="movie-card-link"
        to={`/movie/${movie.id}`}
        aria-label={`View details for ${movie.title}`}
      >
        {/* Movie poster */}
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

        {/* Movie title */}
        <h3>{movie.title}</h3>
      </Link>

      {/* Release year and rating */}
      <p className="movie-card-meta">
        <span>{year}</span>

        <span className="movie-card-rating">
          <span aria-hidden="true">★</span> {rating}
        </span>
      </p>
    </article>
  )
}

export default MovieCard
