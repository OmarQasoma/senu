import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'

import Hero from '../components/Hero.jsx'
import MovieCard from '../components/MovieCard.jsx'
import GenreButtons from '../components/GenreButtons.jsx'

import {
  getPopularMovies,
  searchMovies,
  getMoviesByGenre,
} from '../services/movieApi.js'

import './Home.css'

function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''

  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [retryCount, setRetryCount] = useState(0)

  const [selectedGenre, setSelectedGenre] = useState('')
  const activeRequestKeyRef = useRef(`${searchQuery}:${selectedGenre}`)

  useEffect(() => {
    let active = true

    async function getMovies() {
      const requestKey = `${searchQuery}:${selectedGenre}`

      if (activeRequestKeyRef.current !== requestKey) {
        activeRequestKeyRef.current = requestKey
        setMovies([])
        setTotalPages(1)
        setError('')
        setLoading(true)

        if (page !== 1) {
          setPage(1)
          return
        }
      }

      try {
        let data

        if (searchQuery) {
          data = await searchMovies(searchQuery, page)
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, page)
        } else {
          data = await getPopularMovies(page)
        }

        if (
          !data ||
          !Array.isArray(data.results) ||
          !Number.isInteger(data.total_pages) ||
          data.total_pages < 0
        ) {
          throw new Error('Invalid movie data.')
        }

        if (active) {
          setMovies(previousMovies => {
            const newMovies = data.results.filter(
              movie =>
                !previousMovies.some(
                  savedMovie => savedMovie.id === movie.id
                )
            )

            if (page === 1) {
              return newMovies
            }

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
  }, [page, retryCount, searchQuery, selectedGenre])

  function handleGenreChange(genreId) {
    setSelectedGenre(genreId)
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
      <Hero movie={movies[0]} />

      <section className="home-movies" id="movies">

        <div className="movies-header">
          <h2>
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : selectedGenre
                ? 'Movies by Genre'
                : 'Popular Movies'}
          </h2>

          {!searchQuery && (
            <GenreButtons
              selectedGenre={selectedGenre}
              onSelectGenre={handleGenreChange}
            />
          )}
        </div>

        {loading && (
          <p role="status">Loading movies...</p>
        )}

        {error && (
          <p role="alert">{error}</p>
        )}

        {!loading && !error && movies.length === 0 && (
          <p>No movies found.</p>
        )}

        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
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