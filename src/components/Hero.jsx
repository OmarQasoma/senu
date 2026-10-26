import { Link } from 'react-router'
import './Hero.css'

function Hero({ movie, mediaType = 'movie', watchlist, onToggleWatchlist }) {
  const title = movie ? (mediaType === 'tv' ? movie.name : movie.title) : 'A great night starts with a great story.'
  const date = mediaType === 'tv' ? movie?.first_air_date : movie?.release_date
  const isInWatchlist = movie && watchlist.some(saved => saved.id === movie.id && (saved.media_type || 'movie') === mediaType)
  const rating = Number.isFinite(movie?.vote_average) ? movie.vote_average.toFixed(1) : null
  const backgroundStyle = movie?.backdrop_path
    ? { backgroundImage: `linear-gradient(90deg, #070a10 0%, rgba(7,10,16,.82) 28%, rgba(7,10,16,.08) 80%), linear-gradient(0deg, #070a10, transparent 65%), url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")` }
    : undefined

  return (
    <section className={`hero ${!movie ? 'hero-welcome' : ''}`} aria-labelledby="hero-title" style={backgroundStyle}>
      <div className="hero-content">
        <p className="hero-label"><span className="hero-live-dot" aria-hidden="true" />The Senu spotlight <span className="hero-label-divider" aria-hidden="true" /> {mediaType === 'tv' ? 'Series' : 'Cinema'}</p>
        <h1 id="hero-title">{title}</h1>
        {movie && <ul className="hero-meta" aria-label="Title information">
          {rating && <li className="hero-rating"><span aria-hidden="true">★</span> {rating}<span className="hero-rating-caption"> / 10</span></li>}
          {date && <li>{date.slice(0, 4)}</li>}
          <li className="hero-type">{mediaType === 'tv' ? 'TV Series' : 'Movie'}</li>
        </ul>}
        <p className="hero-description">{movie?.overview || 'Big adventures, unexpected favorites, and stories closer to home. Find something that feels right tonight.'}</p>
        <div className="hero-actions">
          {movie ? <>
            <Link className="hero-button hero-button-primary" to={`/${mediaType}/${movie.id}`}>Explore {mediaType === 'tv' ? 'series' : 'movie'} <span aria-hidden="true">↗</span></Link>
            <button className="hero-button hero-button-secondary" type="button" aria-pressed={Boolean(isInWatchlist)} onClick={() => onToggleWatchlist({ ...movie, media_type: mediaType })}><span aria-hidden="true">{isInWatchlist ? '✓' : '+'}</span>{isInWatchlist ? 'In your watchlist' : 'Watchlist'}</button>
          </> : <a className="hero-button hero-button-primary" href="#moods" onClick={event => { event.preventDefault(); document.getElementById('moods')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>Find my next favorite <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
      <div className="hero-bottom"><span>A world of stories. One place to discover.</span><a href="#discover" onClick={event => { event.preventDefault(); document.getElementById('discover')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }) }}>Find your next favorite <span aria-hidden="true">↓</span></a></div>
      <div className="hero-side-note" aria-hidden="true">MAKE IT A MOVIE NIGHT</div>
    </section>
  )
}

export default Hero
