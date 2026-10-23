import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'

import {
  getMovieDetails,
  getTvDetails,
  getWatchProviders,
  getCast,
} from '../services/movieApi.js'
import './MovieDetails.css'

function MovieDetails() {
  const { movieId } = useParams()
  const { pathname } = useLocation()
  const mediaType = pathname.startsWith('/tv/') ? 'tv' : 'movie'
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [providers, setProviders] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function getMovie() {
      setMovie(null)
      setCast([])
      setProviders(null)
      setLoading(true)
      setError('')

      try {
        const detailsRequest = mediaType === 'tv'
          ? getTvDetails(movieId)
          : getMovieDetails(movieId)
        const [data, castData, providerData] = await Promise.all([
          detailsRequest,
          getCast(mediaType, movieId).catch(() => []),
          getWatchProviders(mediaType, movieId, 'SE').catch(() => null),
        ])
        const title = mediaType === 'tv' ? data?.name : data?.title

        if (
          !data ||
          !Number.isInteger(data.id) ||
          data.id !== Number(movieId) ||
          typeof title !== 'string' ||
          !title.trim()
        ) {
          throw new Error('The movie data is not valid.')
        }

        if (active) {
          setMovie(data)
          setCast(castData.slice(0, 10))
          setProviders(providerData)
        }
      } catch {
        if (active) {
          setError(`Could not load this ${mediaType === 'tv' ? 'TV show' : 'movie'}. Please try again.`)
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
  }, [mediaType, movieId])

  const title = mediaType === 'tv' ? movie?.name : movie?.title
  const date = mediaType === 'tv' ? movie?.first_air_date : movie?.release_date
  const year = typeof date === 'string'
    ? date.slice(0, 4) || 'Unknown year'
    : 'Unknown year'
  const rating = Number.isFinite(movie?.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'
  const availableProviders = providers
    ? [...new Map([
        ...(providers.flatrate || []),
        ...(providers.rent || []),
        ...(providers.buy || []),
      ].map(provider => [provider.provider_id, provider])).values()]
    : []

  return (
    <main className="movie-details">
      <Link className="movie-details-back" to="/">
        Back to browse
      </Link>

      {loading && (
        <p className="movie-details-message" role="status">
          Loading {mediaType === 'tv' ? 'TV show' : 'movie'} details...
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
              alt={`${title} poster`}
            />
          ) : (
            <div className="movie-details-poster movie-details-placeholder">
              No poster available
            </div>
          )}

          <div className="movie-details-summary">
            <h1>{title}</h1>

            <p className="movie-details-meta">
              <span>{year}</span>
              <span className="movie-details-rating">
                <span aria-hidden="true">★</span> {rating}
              </span>
              {Number.isFinite(movie.runtime) && movie.runtime > 0 && (
                <span>{movie.runtime} min</span>
              )}
              {mediaType === 'tv' && Number.isInteger(movie.number_of_seasons) && (
                <span>{movie.number_of_seasons} {movie.number_of_seasons === 1 ? 'season' : 'seasons'}</span>
              )}
            </p>

            <h2>Overview</h2>
            <p className="movie-details-overview">
              {typeof movie.overview === 'string' && movie.overview.trim()
                ? movie.overview
                : 'No overview available.'}
            </p>

            {availableProviders.length > 0 ? (
              <section className="availability" aria-labelledby="availability-title">
                <div className="availability-copy">
                  <p className="availability-eyebrow">Availability in Sweden</p>
                  <h2 id="availability-title">Watch options</h2>
                  <ul className="availability-providers" aria-label="Available providers">
                    {availableProviders.map(provider => (
                      <li key={provider.provider_id} title={provider.provider_name}>
                        {provider.logo_path ? (
                          <img src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`} alt={provider.provider_name} />
                        ) : (
                          <span>{provider.provider_name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {providers.link && (
                  <a className="availability-link" href={providers.link} target="_blank" rel="noreferrer">
                    View watch options
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </section>
            ) : (
              <p className="availability-unavailable">
                Streaming availability in Sweden is not currently listed by TMDb.
              </p>
            )}

            {cast.length > 0 && (
              <section className="cast-section" aria-labelledby="cast-title">
                <h2 id="cast-title">Cast</h2>
                <ul className="cast-list">
                  {cast.map(person => (
                    <li className="cast-member" key={`${person.id}-${person.cast_id ?? person.order}`}>
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <span className="cast-photo-placeholder" aria-hidden="true">
                          {person.name?.charAt(0) || '?'}
                        </span>
                      )}
                      <span className="cast-member-text">
                        <strong>{person.name}</strong>
                        {person.character && <span>{person.character}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </div>
        </article>
      )}
    </main>
  )
}

export default MovieDetails
