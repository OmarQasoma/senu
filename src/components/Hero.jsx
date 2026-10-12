import { Link } from 'react-router'
import './Hero.css'

// Display the featured movie using data passed from Home
function Hero({ movie }) {
  if (!movie) return null

  const year = movie.release_date?.slice(0, 4)

  const rating = Number.isFinite(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  // Add the movie backdrop with dark overlays
  const backgroundStyle = movie.backdrop_path
    ? {
        backgroundImage: `
          linear-gradient(90deg, #0b0d14, rgba(11, 13, 20, 0.3)),
          linear-gradient(0deg, #0b0d14, transparent 70%),
          url("https://image.tmdb.org/t/p/w1280${movie.backdrop_path}")
        `,
      }
    : undefined

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={backgroundStyle}
    >
      <div className="hero-content">
        {/* Hero label */}
        <p className="hero-label">Featured Tonight</p>

        {/* Movie title */}
        <h1 id="hero-title">{movie.title}</h1>

        {/* Rating and release year */}
        <ul className="hero-meta" aria-label="Movie information">
          <li className="hero-rating">
            <span aria-hidden="true">★</span> {rating}
          </li>

          {year && <li>{year}</li>}
        </ul>

        {/* Movie overview */}
        <p className="hero-description">
          {movie.overview || 'No description available.'}
        </p>

        {/* Movie actions */}
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
            title="Trailer will be connected later"
            disabled
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" strokeLinejoin="round" />
            </svg>
            Watch Trailer
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
