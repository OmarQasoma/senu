import { useEffect, useState } from 'react'
import Hero from '../components/Hero.jsx'
import './Home.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

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
  }, [])

  return (
    <main>
      <Hero />

      <section className="home-movies" id="movies">
        <h2>Popular Movies</h2>

        {loading && <p role="status">Loading movies...</p>}
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