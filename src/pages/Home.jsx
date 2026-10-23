import { useEffect, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router'

import Hero from '../components/Hero.jsx'
import MovieCard from '../components/MovieCard.jsx'
import GenreButtons from '../components/GenreButtons.jsx'
import ProviderSelector from '../components/ProviderSelector.jsx'

import {
  getPopularMovies,
  getPopularTvShows,
  searchMovies,
  searchTvShows,
  getMoviesByGenre,
  getTvShowsByGenre,
  discoverByWatchProvider,
  discoverByOriginalLanguage,
} from '../services/movieApi.js'

import './Home.css'

function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''
  const [selectedGenre, setSelectedGenre] = useState('')
  const [mediaType, setMediaType] = useState('movie')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [originalLanguage, setOriginalLanguage] = useState('')

  // A new search or genre starts the movie list again from page 1.
  return (
    <HomeContent
      key={`${searchQuery}:${selectedGenre}:${mediaType}:${originalLanguage}`}
      searchQuery={searchQuery}
      selectedGenre={selectedGenre}
      mediaType={mediaType}
      selectedProvider={selectedProvider}
      originalLanguage={originalLanguage}
      onGenreChange={genre => {
        setSelectedGenre(genre)
      }}
      onMediaTypeChange={type => {
        setSelectedGenre('')
        setSelectedProvider('')
        setMediaType(type)
      }}
      onProviderChange={providerId => {
        setSelectedProvider(providerId)
      }}
      onLanguageChange={() => {
        setOriginalLanguage(language => language === 'ar' ? '' : 'ar')
      }}
    />
  )
}

function HomeContent({
  searchQuery,
  selectedGenre,
  mediaType,
  selectedProvider,
  originalLanguage,
  onGenreChange,
  onMediaTypeChange,
  onProviderChange,
  onLanguageChange,
}) {
  const { watchlist, onToggleWatchlist } = useOutletContext()

  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true

    async function getMovies() {
      setLoading(true)
      setError('')

      try {
        let data

        if (searchQuery) {
          data = mediaType === 'tv'
            ? await searchTvShows(searchQuery, page)
            : await searchMovies(searchQuery, page)
          if (originalLanguage) {
            data = {
              ...data,
              results: data.results?.filter(
                item => item.original_language === originalLanguage
              ) || [],
            }
          }
        } else if (selectedProvider) {
          data = await discoverByWatchProvider(
            mediaType,
            selectedProvider,
            page,
            'SE',
            selectedGenre,
            originalLanguage
          )
        } else if (selectedGenre) {
          data = mediaType === 'tv'
            ? await getTvShowsByGenre(selectedGenre, page, originalLanguage)
            : await getMoviesByGenre(selectedGenre, page, originalLanguage)
        } else if (originalLanguage) {
          data = await discoverByOriginalLanguage(mediaType, originalLanguage, page)
        } else if (mediaType === 'tv') {
          data = await getPopularTvShows(page)
        } else {
          data = await getPopularMovies(page)
        }

        if (
          !data ||
          !Array.isArray(data.results) ||
          !Number.isInteger(data.total_pages) ||
          data.total_pages < 0
        ) {
          throw new Error('Could not load movies. Please try again.')
        }

        if (active) {
          setMovies(previousMovies => {
            if (page === 1) return data.results

            const newMovies = data.results.filter(
              movie =>
                !previousMovies.some(
                  savedMovie => savedMovie.id === movie.id
                )
            )

            return [...previousMovies, ...newMovies]
          })

          setTotalPages(Math.min(data.total_pages, 500))
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    getMovies()

    return () => {
      active = false
    }
  }, [mediaType, originalLanguage, page, retryCount, searchQuery, selectedGenre, selectedProvider])

  function handleProviderChange(providerId) {
    if (providerId === selectedProvider) return
    setMovies([])
    setError('')
    setLoading(true)
    setPage(1)
    setTotalPages(1)
    onProviderChange(providerId)
  }

  function handleLoadMore() {
    if (loading) return

    setLoading(true)

    if (error) {
      setError('')
      setRetryCount(previousCount => previousCount + 1)
    } else {
      setPage(previousPage => previousPage + 1)
    }
  }

  return (
    <main>
      <Hero
        movie={movies[0]}
        mediaType={mediaType}
        watchlist={watchlist}
        onToggleWatchlist={onToggleWatchlist}
      />

      <section className="home-movies" id="movies">
        <section className="browse-controls" aria-label="Browse filters">

          <div className="movies-header">
            <div className="browse-mode-row">
              <div className="media-type-buttons" aria-label="Browse by type">
                {['movie', 'tv'].map(type => (
                  <button
                    key={type}
                    className={`genre-button ${mediaType === type ? 'genre-button-active' : ''}`}
                    type="button"
                    onClick={() => onMediaTypeChange(type)}
                    aria-pressed={mediaType === type}
                  >
                    {type === 'movie' ? 'Movies' : 'TV Shows'}
                  </button>
                ))}
              </div>

              <button
                className={`language-filter ${originalLanguage === 'ar' ? 'language-filter-active' : ''}`}
                type="button"
                onClick={onLanguageChange}
                aria-pressed={originalLanguage === 'ar'}
              >
                <span aria-hidden="true">ع</span>
                Arabic only
              </button>
            </div>

            <h2>
              {searchQuery
                ? `${originalLanguage === 'ar' ? 'Arabic ' : ''}${mediaType === 'tv' ? 'TV' : 'Movie'} results for "${searchQuery}"`
                : selectedProvider
                  ? `${originalLanguage === 'ar' ? 'Arabic ' : ''}${mediaType === 'tv' ? 'TV shows' : 'Movies'} on this platform`
                : selectedGenre
                  ? `${originalLanguage === 'ar' ? 'Arabic ' : ''}${mediaType === 'tv' ? 'TV Shows' : 'Movies'} by Genre`
                  : `Popular ${originalLanguage === 'ar' ? 'Arabic ' : ''}${mediaType === 'tv' ? 'TV Shows' : 'Movies'}`}
            </h2>

            {!searchQuery && (
              <GenreButtons
                selectedGenre={selectedGenre}
                onSelectGenre={onGenreChange}
                mediaType={mediaType}
              />
            )}
          </div>

          {!searchQuery && (
            <ProviderSelector
              mediaType={mediaType}
              selectedProvider={selectedProvider}
              onSelectProvider={handleProviderChange}
            />
          )}
        </section>

        {loading && (
          <p role="status">Loading {mediaType === 'tv' ? 'TV shows' : 'movies'}...</p>
        )}

        {error && (
          <p role="alert">{error}</p>
        )}

        {!loading && !error && movies.length === 0 && (
          <p>No {mediaType === 'tv' ? 'TV shows' : 'movies'} found.</p>
        )}

        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              mediaType={mediaType}
              watchlist={watchlist}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>

        {(loading || error || page < totalPages) && (
          <div className="home-movies-actions">
            <button
              className="load-more-button"
              type="button"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading
                ? 'Loading...'
                : error
                  ? 'Try again'
                  : 'Load More'}
            </button>
          </div>
        )}

      </section>
    </main>
  )
}

export default Home
