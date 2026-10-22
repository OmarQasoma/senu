
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

import { getMovieDetails } from '../services/movieApi.js'
import './MovieDetails.css'

function MovieDetails() {
  const { movieId } = useParams()

  const [movie, updateMovie] = useState(null)
  const [loading, updateLoading] = useState(true)
  const [error, updateError] = useState('')

  useEffect(() => {
    let active = true

    async function loadMovie() {
      updateLoading(true)
      updateError('')
      updateMovie(null)

      try {
        const data = await getMovieDetails(movieId)

        if (!data?.title || data.id !== Number(movieId)) {
          throw new Error('Invalid movie data')
        }

        if (active) {
          updateMovie(data)
        }
      } catch {
        if (active) {
          updateError('Could not load this movie. Please try again.')
        }
      } finally {
        if (active) {
          updateLoading(false)
        }
      }
    }

    loadMovie()

    return () => {
      active = false
    }
  }, [movieId])

  const year = movie?.release_date?.slice(0, 4) || 'Unknown year'

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
          {movie.poster_path ? (
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

              {movie.runtime > 0 && (
                <span>{movie.runtime} min</span>
              )}
            </p>

            <h2>Overview</h2>

            <p className="movie-details-overview">
              {movie.overview?.trim() || 'No overview available.'}
            </p>

            <p>
             Genres: {movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}
            </p>
             
           <p>
           Status: {movie.status || 'N/A'}
           </p>

           <p>
           Original Language: {movie.original_language || 'N/A'}
           </p>

          </div>
        </article>
      )}
    </main>
  )
}

export default MovieDetails
