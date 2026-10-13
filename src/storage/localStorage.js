const WATCHLIST_KEY = 'senu-watchlist'
const watchlistListeners = new Set()

export function subscribeWatchlist(listener) {
  watchlistListeners.add(listener)

  function handleStorage(event) {
    if (
      event.storageArea === localStorage &&
      (event.key === WATCHLIST_KEY || event.key === null)
    ) {
      listener()
    }
  }

  window.addEventListener('storage', handleStorage)

  return () => {
    watchlistListeners.delete(listener)
    window.removeEventListener('storage', handleStorage)
  }
}

export function getWatchlist() {
  try {
    const savedWatchlist = JSON.parse(
      localStorage.getItem(WATCHLIST_KEY) || '[]'
    )

    if (!Array.isArray(savedWatchlist)) return []

    return savedWatchlist.filter(
      movie => movie && Number.isInteger(movie.id)
    )
  } catch {
    return []
  }
}

export function toggleWatchlist(movie) {
  const savedWatchlist = getWatchlist()
  const movieExists = savedWatchlist.some(
    savedMovie => savedMovie.id === movie.id
  )

  const updatedWatchlist = movieExists
    ? savedWatchlist.filter(savedMovie => savedMovie.id !== movie.id)
    : [...savedWatchlist, movie]

  localStorage.setItem(
    WATCHLIST_KEY,
    JSON.stringify(updatedWatchlist)
  )

  watchlistListeners.forEach(listener => listener())

  return updatedWatchlist
}
