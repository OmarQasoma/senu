import { Link } from 'react-router'
import './Hero.css'

function Hero({ movie, mediaType = 'movie', watchlist, onToggleWatchlist }) {
  if (!movie) return null

  const isInWatchlist = watchlist.some(
    savedMovie => (
      savedMovie.id === movie.id &&
      (savedMovie.media_type || 'movie') === mediaType
    )
  )

  const title = mediaType === 'tv' ? movie.name : movie.title
  const date = mediaType === 'tv' ? movie.first_air_date : movie.release_date
  const year = date?.slice(0, 4)

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
    onToggleWatchlist({ ...movie, media_type: mediaType })
  }

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={backgroundStyle}
    >
      <div className="hero-content">
        <p className="hero-label">Featured Tonight</p>

        <h1 id="hero-title">{title}</h1>

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
            to={`/${mediaType}/${movie.id}`}
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
