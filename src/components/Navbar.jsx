import senuLogo from '../assets/senu-logo.png'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a className="navbar-logo" href="/" aria-label="SENU Home">
          <img src={senuLogo} alt="SENU" />
        </a>

        <nav className="navbar-nav" aria-label="Main navigation">
          <a className="navbar-link" href="/" aria-current="page">
            Home
          </a>
          <a className="navbar-link" href="#movies">
            Movies
          </a>
          <a className="navbar-link" href="#genres">
            Genres
          </a>
        </nav>

        <div className="navbar-actions">
          <label className="navbar-search">
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
            />
          </label>

          <button
            className="navbar-icon"
            type="button"
            aria-label="Shopping cart — coming soon"
            title="Shopping cart — coming soon"
            disabled
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.5 11h11L21 7H6" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
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