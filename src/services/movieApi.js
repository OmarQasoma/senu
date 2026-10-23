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

export async function getMoviesByGenre(genreId, page = 1, originalLanguage = '') {
  const languageFilter = originalLanguage
    ? `&with_original_language=${encodeURIComponent(originalLanguage)}`
    : ''

  return fetchFromTmdb(
    `/discover/movie?with_genres=${genreId}&page=${page}${languageFilter}`,
    'Could not load movies for this genre. Please try again.'
  )
}

export async function getTvShowsByGenre(genreId, page = 1, originalLanguage = '') {
  const languageFilter = originalLanguage
    ? `&with_original_language=${encodeURIComponent(originalLanguage)}`
    : ''

  return fetchFromTmdb(
    `/discover/tv?with_genres=${encodeURIComponent(genreId)}&page=${page}${languageFilter}`,
    'Could not load TV shows for this genre. Please try again.'
  )
}

export async function searchMovies(query, page = 1) {
  return fetchFromTmdb(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    'Could not search movies. Please try again.'
  )
}

export async function getPopularTvShows(page = 1) {
  return fetchFromTmdb(
    `/tv/popular?page=${page}`,
    'Could not load TV shows. Please try again.'
  )
}

export async function searchTvShows(query, page = 1) {
  return fetchFromTmdb(
    `/search/tv?query=${encodeURIComponent(query)}&page=${page}`,
    'Could not search TV shows. Please try again.'
  )
}

export async function getTvDetails(tvId) {
  return fetchFromTmdb(
    `/tv/${tvId}`,
    'Could not load this TV show. Please try again.'
  )
}

export async function getWatchProviders(mediaType, mediaId, region = 'SE') {
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    throw new Error('Unsupported media type.')
  }

  const data = await fetchFromTmdb(
    `/${mediaType}/${mediaId}/watch/providers`,
    'Could not load streaming providers. Please try again.'
  )

  return data?.results?.[region.toUpperCase()] || null
}

export async function getCast(mediaType, mediaId) {
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    throw new Error('Unsupported media type.')
  }

  const data = await fetchFromTmdb(
    `/${mediaType}/${mediaId}/credits`,
    'Could not load cast information. Please try again.'
  )

  return Array.isArray(data?.cast) ? data.cast : []
}

export async function getAvailableWatchProviders(mediaType, region = 'SE') {
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    throw new Error('Unsupported media type.')
  }

  return fetchFromTmdb(
    `/watch/providers/${mediaType}?watch_region=${encodeURIComponent(region.toUpperCase())}`,
    'Could not load streaming platforms. Please try again.'
  )
}

export async function discoverByWatchProvider(
  mediaType,
  providerId,
  page = 1,
  region = 'SE',
  genreId = '',
  originalLanguage = ''
) {
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    throw new Error('Unsupported media type.')
  }

  const genreFilter = genreId
    ? `&with_genres=${encodeURIComponent(genreId)}`
    : ''
  const languageFilter = originalLanguage
    ? `&with_original_language=${encodeURIComponent(originalLanguage)}`
    : ''

  return fetchFromTmdb(
    `/discover/${mediaType}?watch_region=${encodeURIComponent(region.toUpperCase())}` +
      `&with_watch_providers=${encodeURIComponent(providerId)}` +
      `&page=${page}${genreFilter}${languageFilter}`,
    'Could not load titles for this streaming platform. Please try again.'
  )
}

export async function discoverByOriginalLanguage(mediaType, language, page = 1) {
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    throw new Error('Unsupported media type.')
  }

  return fetchFromTmdb(
    `/discover/${mediaType}?with_original_language=${encodeURIComponent(language)}` +
      `&sort_by=popularity.desc&page=${page}`,
    `Could not load ${mediaType === 'tv' ? 'TV shows' : 'movies'} in this language. Please try again.`
  )
}
