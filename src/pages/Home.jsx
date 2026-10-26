import { useEffect, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router'
import Hero from '../components/Hero.jsx'
import MovieCard from '../components/MovieCard.jsx'
import MovieShelf from '../components/MovieShelf.jsx'
import MoodPicker from '../components/MoodPicker.jsx'
import { moods } from '../components/moods.js'
import GenreButtons from '../components/GenreButtons.jsx'
import ProviderSelector from '../components/ProviderSelector.jsx'
import {
  getPopularMovies, getPopularTvShows, searchMovies, searchTvShows,
  getMoviesByGenre, getTvShowsByGenre, discoverByWatchProvider,
  discoverByOriginalLanguage,
} from '../services/movieApi.js'
import './Home.css'

const initialFilters = { genre: '', mood: '', provider: '', language: '', browseAll: false }

function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim() || ''
  const [filters, setFilters] = useState(initialFilters)
  const [mediaType, setMediaType] = useState('movie')
  const [filtersOpen, setFiltersOpen] = useState(false)

  function changeFilter(name, value) {
    setFilters(previous => ({
      ...previous,
      [name]: value,
      ...(name === 'mood' ? { genre: '' } : {}),
      ...(name === 'genre' ? { mood: '' } : {}),
    }))
  }

  return (
    <HomeContent
      key={JSON.stringify([searchQuery, mediaType, filters])}
      searchQuery={searchQuery}
      filters={filters}
      mediaType={mediaType}
      filtersOpen={filtersOpen}
      onFiltersOpenChange={setFiltersOpen}
      onFilterChange={changeFilter}
      onReset={() => setFilters(initialFilters)}
      onMediaTypeChange={type => {
        setFilters(initialFilters)
        setMediaType(type)
      }}
    />
  )
}

function HomeContent({ searchQuery, filters, mediaType, filtersOpen, onFiltersOpenChange, onFilterChange, onReset, onMediaTypeChange }) {
  const { watchlist, onToggleWatchlist } = useOutletContext()
  const selectedMood = moods.find(mood => mood.id === filters.mood)
  const selectedGenre = selectedMood ? selectedMood.genres[mediaType] : filters.genre
  const isSearching = Boolean(searchQuery)
  const isFiltered = Boolean(isSearching || selectedGenre || filters.provider || filters.language || filters.browseAll)
  const activeFilterCount = [!isSearching && selectedGenre, !isSearching && filters.provider, filters.language].filter(Boolean).length
  const typeName = mediaType === 'tv' ? 'TV shows' : 'movies'
  const languageName = filters.language === 'ar' ? 'Arabic ' : filters.language === 'ku' ? 'Kurmanji ' : ''
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let active = true

    async function loadMovies() {
      try {
        let data
        if (searchQuery) {
          data = mediaType === 'tv' ? await searchTvShows(searchQuery, page) : await searchMovies(searchQuery, page)
          if (filters.language) {
            data = { ...data, results: data.results?.filter(item => item.original_language === filters.language) || [] }
          }
        } else if (filters.provider) {
          data = await discoverByWatchProvider(mediaType, filters.provider, page, 'SE', selectedGenre, filters.language)
        } else if (selectedGenre) {
          data = mediaType === 'tv'
            ? await getTvShowsByGenre(selectedGenre, page, filters.language)
            : await getMoviesByGenre(selectedGenre, page, filters.language)
        } else if (filters.language) {
          data = await discoverByOriginalLanguage(mediaType, filters.language, page)
        } else {
          data = mediaType === 'tv' ? await getPopularTvShows(page) : await getPopularMovies(page)
        }

        if (!Array.isArray(data?.results) || !Number.isInteger(data.total_pages) || data.total_pages < 0) {
          throw new Error('Could not load titles. Please try again.')
        }
        if (active) {
          setMovies(previous => page === 1 ? data.results : [
            ...previous,
            ...data.results.filter(movie => !previous.some(saved => saved.id === movie.id)),
          ])
          setTotalPages(Math.min(data.total_pages, 500))
        }
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadMovies()
    return () => { active = false }
  }, [searchQuery, mediaType, filters.provider, filters.language, selectedGenre, page, retryCount])

  function loadMore() {
    if (loading) return
    setLoading(true)
    setError('')
    if (error) setRetryCount(count => count + 1)
    else setPage(previous => previous + 1)
  }

  const resultsTitle = isSearching
    ? `Results for “${searchQuery}”`
    : selectedMood
      ? `${selectedMood.name} picks for tonight`
      : filters.language
        ? `${languageName}${typeName}`
        : filters.provider
          ? `${mediaType === 'tv' ? 'TV shows' : 'Movies'} on your platform`
          : selectedGenre
            ? `Explore ${typeName} by genre`
            : `Popular ${typeName}`

  return (
    <main className="discovery-home">
      {!isFiltered && <Hero movie={movies[0]} mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />}

      <div className={`home-movies ${isFiltered ? 'home-movies-filtered' : ''}`} id="discover">
        {!isSearching && <MoodPicker selectedMood={filters.mood} onSelectMood={mood => onFilterChange('mood', mood)} />}

        <section className="browse-controls" aria-label="Browse filters">
          <div className="browse-toolbar">
            <div className="media-type-buttons" aria-label="Browse by type">
              {['movie', 'tv'].map(type => (
                <button key={type} className={`genre-button ${mediaType === type ? 'genre-button-active' : ''}`} type="button" onClick={() => onMediaTypeChange(type)} aria-pressed={mediaType === type}>
                  {type === 'movie' ? 'Movies' : 'TV Shows'}
                </button>
              ))}
            </div>
            <span className="browse-toolbar-note">Your next favorite is out there.</span>
            <div className="browse-toolbar-actions">
              {!isFiltered && <button type="button" className="text-button browse-all-button" onClick={() => onFilterChange('browseAll', true)}>Browse all <span aria-hidden="true">↗</span></button>}
              <button type="button" className={`filters-toggle ${filtersOpen ? 'filters-toggle-active' : ''}`} aria-expanded={filtersOpen} aria-controls="browse-filter-panel" onClick={() => onFiltersOpenChange(!filtersOpen)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="3" fill="currentColor" /><circle cx="15" cy="17" r="3" fill="currentColor" /></svg>
                Filters {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
              </button>
            </div>
          </div>

          <div id="browse-filter-panel" hidden={!filtersOpen} className="browse-filter-panel">
            <div className="filter-group">
              <span className="filter-group-label">Language</span>
              <div className="language-filters" aria-label="Original language">
                {[{ code: '', label: 'All languages', symbol: '◎' }, { code: 'ar', label: 'Arabic', symbol: 'ع' }, { code: 'ku', label: 'Kurmanji', symbol: 'K' }].map(language => (
                  <button key={language.code} className={`language-filter ${filters.language === language.code ? 'language-filter-active' : ''}`} type="button" onClick={() => onFilterChange('language', filters.language === language.code ? '' : language.code)} aria-pressed={filters.language === language.code}>
                    <span className="language-filter-icon" aria-hidden="true">{language.symbol}</span>
                    {language.label}
                  </button>
                ))}
              </div>
            </div>
            {!isSearching && <>
              <div className="filter-group">
                <span className="filter-group-label">Genre</span>
                <GenreButtons selectedGenre={filters.genre} onSelectGenre={genre => onFilterChange('genre', genre)} mediaType={mediaType} />
              </div>
              <ProviderSelector mediaType={mediaType} selectedProvider={filters.provider} onSelectProvider={provider => onFilterChange('provider', provider)} />
            </>}
          </div>
        </section>

        {isFiltered ? (
          <section className="browse-results" aria-labelledby="results-title" aria-busy={loading}>
            <div className="section-heading results-heading">
              <div>
                <span className="section-eyebrow">{selectedMood && !isSearching ? 'Picked for your mood' : 'Discover something good'}</span>
                <h2 id="results-title">{resultsTitle}</h2>
                {selectedMood && !isSearching && <p>{selectedMood.description}. Explore {languageName}{typeName} below.</p>}
              </div>
              {(activeFilterCount > 0 || filters.browseAll) && <button type="button" className="text-button" onClick={onReset}>{isSearching ? 'Clear filters' : 'Back to discover'} <span aria-hidden="true">↗</span></button>}
            </div>
            {error && <div className="collection-message" role="alert"><p>{error}</p></div>}
            {loading && <p className="results-status" role="status">Finding your next favorite…</p>}
            {!loading && !error && movies.length === 0 && <div className="collection-message"><p>No matches on this page. Try another mood, adjust your filters, or check the next page when available.</p></div>}
            <div className="movie-grid">
              {movies.map(movie => <MovieCard key={movie.id} movie={movie} mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />)}
            </div>
            {(loading || error || page < totalPages) && <div className="home-movies-actions"><button className="load-more-button" type="button" onClick={loadMore} disabled={loading}>{loading ? 'Loading…' : error ? 'Try again' : 'Discover more'}</button></div>}
          </section>
        ) : (
          <>
            {error && <div className="collection-message" role="alert"><p>{error}</p><button className="text-button" type="button" onClick={loadMore}>Retry featured title ↗</button></div>}
            <MovieShelf title="Trending this week" subtitle="The stories everyone’s talking about." collection="trending" mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />
            <MovieShelf title="Worth the hype" subtitle="Top-rated stories, loved by audiences." collection="top-rated" mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />
            <div className="world-cinema-note"><span aria-hidden="true">◎</span><div><span className="section-eyebrow">Stories without borders</span><p>A different language. A new perspective.</p></div><span className="world-cinema-line" aria-hidden="true" /></div>
            <MovieShelf title="Arabic stories" subtitle={`Explore ${typeName} originally told in Arabic.`} collection="ar" mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />
            <MovieShelf title="Kurdish cinema" subtitle={`Discover ${typeName} in the Kurmanji language collection.`} collection="ku" mediaType={mediaType} watchlist={watchlist} onToggleWatchlist={onToggleWatchlist} />
            <div className="discover-end"><span aria-hidden="true">✦</span><p>There’s always another great story.</p><button className="text-button" type="button" onClick={() => onFilterChange('browseAll', true)}>Explore all {typeName} ↗</button></div>
          </>
        )}
      </div>
    </main>
  )
}

export default Home
