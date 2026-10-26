import { useEffect, useId, useRef, useState } from 'react'
import { getDiscoveryCollection } from '../services/movieApi.js'
import MovieCard from './MovieCard.jsx'
import './MovieShelf.css'

export default function MovieShelf({ title, subtitle, collection, mediaType, watchlist, onToggleWatchlist }) {
  const headingId = useId()
  const track = useRef(null)
  const [result, setResult] = useState({ loading: true, movies: [], error: '' })
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const data = await getDiscoveryCollection(mediaType, collection)
        if (!Array.isArray(data?.results)) throw new Error('Could not load this collection.')
        if (active) setResult({ loading: false, movies: data.results.slice(0, 12), error: '' })
      } catch (error) {
        if (active) setResult({ loading: false, movies: [], error: error.message })
      }
    }
    load()
    return () => { active = false }
  }, [mediaType, collection, retryCount])

  function scroll(direction) {
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }

  return (
    <section className="movie-shelf" aria-labelledby={headingId}>
      <div className="section-heading">
        <div>
          <h2 id={headingId}>{title}<span className="shelf-title-dot" aria-hidden="true">.</span></h2>
          <p>{subtitle}</p>
        </div>
        {!result.loading && result.movies.length > 0 && <div className="shelf-arrows"><button type="button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}>←</button><button type="button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}>→</button></div>}
      </div>
      {result.loading ? (
        <div className="shelf-skeleton" role="status" aria-label={`Loading ${title}`}>
          {Array.from({ length: 6 }, (_, index) => <div key={index}><span /><i /></div>)}
        </div>
      ) : result.error ? (
        <div className="collection-message" role="alert"><p>{result.error}</p><button type="button" className="text-button" onClick={() => { setResult({ loading: true, movies: [], error: '' }); setRetryCount(count => count + 1) }}>Try again ↗</button></div>
      ) : result.movies.length === 0 ? (
        <p className="collection-message">No {mediaType === 'tv' ? 'TV shows' : 'movies'} available in this collection yet. Try Movies or another language in the filters.</p>
      ) : (
        <div className="shelf-track" ref={track} tabIndex={0} role="group" aria-label={`${title}, scroll for more titles`}>
          {result.movies.map(movie => <MovieCard key={movie.id} movie={movie} mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />)}
        </div>
      )}
    </section>
  )
}
