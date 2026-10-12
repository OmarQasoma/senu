import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const searchText = query.trim()

    if (!searchText) return

    onSearch(searchText)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={event => setQuery(event.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar