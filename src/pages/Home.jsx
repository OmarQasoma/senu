
import { useEffect, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router'

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
  const { watchlist, changeWatchlist } = useOutletContext()
  const [searchParams] = useSearchParams()
  const searchMovie = searchParams.get('search') || ''

  const [movies, updateMovies] = useState([])
  const [selectedGenre, updateSelectedGenre] = useState('')
  const [loading, updateLoading] = useState(true)
  const [error, updateError] = useState('')

  useEffect(() => {
    let active = true

    async function loadMovies() {
      updateLoading(true)
      updateError ('')
      updateMovies([])

      try {
        let data

        if (searchMovie) {
          data = await searchMovies(searchMovie, 1)
        } else if (selectedGenre) {
          data = await getMoviesByGenre(selectedGenre, 1)
        } else {
          data = await getPopularMovies(1)
        }

        if (!data || !Array.isArray(data.results)) {
          throw new Error('Invalid movie data')
        }

        if (active) {
          updateMovies(data.results)
        }
      } catch {
        if (active) {
          updateError('Could not load movies. Please try again.')
        }
      } finally {
        if (active) {
          updateLoading(false)
        }
      }
    }

    loadMovies()

    return () => {
      active = false
    }
  }, [searchMovie, selectedGenre])

  return (
    <main>
      <Hero
        movie={movies[0]}
        watchlist={watchlist}
        onToggleWatchlist={onToggleWatchlist}
      />

      <section className="home-movies" id="movies">
        <div className="movies-header">
          <h2>
            {searchMovie
              ? `Search results for "${searchMovie}"`
              : selectedGenre
                ? 'Movies by Genre'
                : 'Popular Movies'}
          </h2>

          {!searchMovie && (
            <GenreButtons
              selectedGenre={selectedGenre}
              onSelectGenre={updateSelectedGenre}
            />
          )}
        </div>

        {loading && <p>Loading movies...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p>No movies found.</p>
        )}

        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard
            key={movie.id}
           movie={movie}
           watchlist={watchlist}
           onToggleWatchlist={changeWatchlist}
           />
            
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
