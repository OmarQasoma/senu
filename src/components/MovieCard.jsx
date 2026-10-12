import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import './MovieCard.css'

const WATCHLIST_KEY = 'senu-watchlist'

function MovieCard({ movie }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const year = movie.release_date?.slice(0, 4) || 'Unknown year'

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  useEffect(() => {
    const savedWatchlist = JSON.parse(
      localStorage.getItem(WATCHLIST_KEY) || '[]'
    )

    setIsInWatchlist(
      savedWatchlist.some(savedMovie => savedMovie.id === movie.id)
    )
  }, [movie.id])

  function handleWatchlist() {
    const savedWatchlist = JSON.parse(
      localStorage.getItem(WATCHLIST_KEY) || '[]'
    )

    if (isInWatchlist) {
      const updatedWatchlist = savedWatchlist.filter(
        savedMovie => savedMovie.id !== movie.id
      )

      localStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(updatedWatchlist)
      )

      setIsInWatchlist(false)
    } else {
      const updatedWatchlist = [...savedWatchlist, movie]

      localStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(updatedWatchlist)
      )

      setIsInWatchlist(true)
    }
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