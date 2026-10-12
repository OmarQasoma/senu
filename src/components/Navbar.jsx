import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import senuLogo from '../assets/senu-logo.png'
import './Navbar.css'

function Navbar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const searchText = query.trim()

    if (!searchText) {
      navigate('/')
      return
    }

    navigate(`/?search=${encodeURIComponent(searchText)}`)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">

        <Link
          className="navbar-logo"
          to="/"
          aria-label="SENU Home"
        >
          <img src={senuLogo} alt="SENU" />
        </Link>

        <nav className="navbar-nav" aria-label="Main navigation">
          <NavLink className="navbar-link" to="/" end>
            Home
          </NavLink>

          <NavLink className="navbar-link" to="/watchlist">
            Watchlist
          </NavLink>

          <span
            className="navbar-link"
            title="Genres — coming soon"
          >
            Genres
          </span>
        </nav>

        <div className="navbar-actions">

          <form
            className="navbar-search"
            onSubmit={handleSearch}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="search"
              placeholder="Search movies..."
              aria-label="Search movies"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </form>

          <button
            className="navbar-icon"
            type="button"
            aria-label="Watchlist"
            title="Watchlist"
            onClick={() => navigate('/watchlist')}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M6 4h12v16l-6-4-6 4V4Z" />
            </svg>
          </button>

          <button
            className="navbar-icon navbar-profile"
            type="button"
            aria-label="User profile — coming soon"
            title="User profile — coming soon"
            disabled
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  )
}

export default Navbar