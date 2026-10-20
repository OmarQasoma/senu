import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getMovieDetails } from '../services/movieApi.js'
import './MovieDetails.css'

function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function getMovie() {
      setMovie(null)
      setLoading(true)
      setError('')

      try {
        const data = await getMovieDetails(movieId)

        if (
          !data ||
          !Number.isInteger(data.id) ||
          data.id !== Number(movieId) ||
          typeof data.title !== 'string' ||
          !data.title.trim()
        ) {
          throw new Error('The movie data is not valid.')
        }

        if (active) {
          setMovie(data)
        }
      } catch {
        if (active) {
          setError('Could not load this movie. Please try again.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    getMovie()

    return () => {
      active = false
    }
  }, [movieId])

  const year = typeof movie?.release_date === 'string'
    ? movie.release_date.slice(0, 4) || 'Unknown year'
    : 'Unknown year'
  const rating = Number.isFinite(movie?.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  return (
    <main className="movie-details">
      <Link className="movie-details-back" to="/">
        Back to movies
      </Link>

      {loading && (
        <p className="movie-details-message" role="status">
          Loading movie details...
        </p>
      )}

      {error && (
        <p className="movie-details-message" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && movie && (
        <article className="movie-details-content">
          {typeof movie.poster_path === 'string' && movie.poster_path ? (
            <img
              className="movie-details-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className="movie-details-poster movie-details-placeholder">
              No poster available
            </div>
          )}

          <div className="movie-details-summary">
            <h1>{movie.title}</h1>

            <p className="movie-details-meta">
              <span>{year}</span>
              <span className="movie-details-rating">
                <span aria-hidden="true">★</span> {rating}
              </span>
              {Number.isFinite(movie.runtime) && movie.runtime > 0 && (
                <span>{movie.runtime} min</span>
              )}
            </p>

            <h2>Overview</h2>
            <p className="movie-details-overview">
              {typeof movie.overview === 'string' && movie.overview.trim()
                ? movie.overview
                : 'No overview available.'}
            </p>
          </div>
        </article>
      )}
    </main>
  )
}

export default MovieDetails
