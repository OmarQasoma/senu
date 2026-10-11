import { useEffect, useState } from 'react'
import Hero from '../components/Hero.jsx'
import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function getMovies() {
      try {
        const response = await fetch('/api/tmdb/movie/popular')

        if (!response.ok) {
          throw new Error('HTTP ' + response.status)
        }

        const data = await response.json()

        if (active) {
          setMovies(data.results)
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      }
    }

    getMovies()

    return () => {
      active = false
    }
  }, [])

  return (
    <main>
      <Hero />

      <section className="home-movies" id="movies">
        <h2>Popular Movies</h2>

        {error && <p role="alert">{error}</p>}

        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Home