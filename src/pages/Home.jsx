import Hero from '../components/Hero.jsx'
import './Home.css'

function Home() {
  return (
    <main>
      <Hero />

      <section className="home-movies" id="movies">
        <h2>Popular Movies</h2>
        <p>Discover your next favourite movie.</p>
      </section>
    </main>
  )
}

export default Home