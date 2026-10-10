import './Hero.css'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="hero-label">Featured Tonight</p>

        <h1 id="hero-title">Dune: Part Two</h1>

        <ul className="hero-meta" aria-label="Movie information">
          <li className="hero-rating">
            <span aria-hidden="true">★</span> 8.5
          </li>
          <li>2024</li>
          <li>Sci-Fi / Adventure</li>
          <li>2h 46m</li>
          <li className="hero-age">PG-13</li>
        </ul>

        <p className="hero-description">
          Paul Atreides unites with Chani and the Fremen on a path
          of revenge, facing a choice between love and the fate
          of the universe.
        </p>

        <div className="hero-actions">
          <button
            className="hero-button hero-button-primary"
            type="button"
            title="Movie details will be connected later"
            disabled
          >
            <span aria-hidden="true">↗</span>
            View Details
          </button>

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