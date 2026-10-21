async function fetchFromTmdb(path, errorMessage) {
  const response = await fetch(`/api/tmdb${path}`)

  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return response.json()
}

export async function getPopularMovies(page = 1) {
  return fetchFromTmdb(
    `/movie/popular?page=${page}`,
    'Could not load movies. Please try again.'
  )
}

export async function getMovieDetails(movieId) {
  return fetchFromTmdb(
    `/movie/${movieId}`,
    'Could not load this movie. Please try again.'
  )
}

export async function getMoviesByGenre(genreId, page = 1) {
  return fetchFromTmdb(
    `/discover/movie?with_genres=${genreId}&page=${page}`,
    'Could not load movies for this genre. Please try again.'
  )
}

export async function searchMovies(query, page = 1) {
  return fetchFromTmdb(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    'Could not search movies. Please try again.'
  )
}
