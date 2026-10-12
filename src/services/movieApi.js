export async function getPopularMovies(page = 1) {
  const response = await fetch(`/api/tmdb/movie/popular?page=${page}`)

  if (!response.ok) {
    throw new Error('HTTP ' + response.status)
  }

  const data = await response.json()

  return data
}

export async function getMovieDetails(movieId) {
  const response = await fetch(`/api/tmdb/movie/${movieId}`)

  if (!response.ok) {
    throw new Error('Could not load this movie. Please try again.')
  }

  const data = await response.json()

  return data
}


// for grenre buttons

export async function getMoviesByGenre(genreId, page = 1) {
  const response = await fetch(
    `/api/tmdb/discover/movie?with_genres=${genreId}&page=${page}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre')
  }

  const data = await response.json()

  return data
}

// for searchMovie 
export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `/api/tmdb/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  )

  if (!response.ok) {
    throw new Error('Failed to search movies')
  }

  const data = await response.json()

  return data
}