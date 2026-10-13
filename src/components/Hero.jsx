import { Link } from 'react-router'
import useWatchlist from '../hooks/useWatchlist.js'
import { toggleWatchlist } from '../storage/localStorage.js'
import './Hero.css'

function Hero({ movie }) {
  const isInWatchlist = useWatchlist(movie?.id)

  if (!movie) return null

  const year = movie.release_date?.slice(0, 4)

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  const backgroundStyle = movie.backdrop_path
    ? {
        backgroundImage: `
          linear-gradient(90deg, #0b0d14, rgba(11, 13, 20, 0.3)),
          linear-gradient(0deg, #0b0d14, transparent 70%),
          url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")
        `,
      }
    : undefined

  function handleWatchlist() {
    toggleWatchlist(movie)
  }

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={backgroundStyle}
    >
      <div className="hero-content">
        <p className="hero-label">Featured Tonight</p>

        <h1 id="hero-title">{movie.title}</h1>

        <ul className="hero-meta" aria-label="Movie information">
          <li className="hero-rating">
            <span aria-hidden="true">★</span> {rating}
          </li>

          {year && <li>{year}</li>}
        </ul>

        <p className="hero-description">
          {movie.overview || 'No description available.'}
        </p>

        <div className="hero-actions">
          <Link
            className="hero-button hero-button-primary"
            to={`/movie/${movie.id}`}
          >
            <span aria-hidden="true">↗</span>
            View Details
          </Link>

          <button
            className="hero-button hero-button-secondary"
            type="button"
            onClick={handleWatchlist}
          >
            <span aria-hidden="true">
              {isInWatchlist ? '−' : '+'}
            </span>

            {isInWatchlist
              ? 'Remove from Watchlist'
              : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
