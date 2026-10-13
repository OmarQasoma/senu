import { useSyncExternalStore } from 'react'
import { getWatchlist, subscribeWatchlist } from '../storage/localStorage.js'

function useWatchlist(movieId) {
  return useSyncExternalStore(
    subscribeWatchlist,
    () => getWatchlist().some(movie => movie.id === movieId),
    () => false
  )
}

export default useWatchlist
