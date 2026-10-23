const movieGenres = [
  { id: '', name: 'All' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 16, name: 'Animation' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 14, name: 'Fantasy' },
  { id: 10751, name: 'Family' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
]

const tvGenres = [
  { id: '', name: 'All' },
  { id: 10759, name: 'Action & Adventure' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 80, name: 'Crime' },
  { id: 16, name: 'Animation' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 99, name: 'Documentary' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10764, name: 'Reality' },
  { id: 10768, name: 'War & Politics' },
]

function GenreButtons({ selectedGenre, onSelectGenre, mediaType = 'movie' }) {
  const genres = mediaType === 'tv' ? tvGenres : movieGenres

  return (
    <div className="genre-buttons">
      {genres.map(genre => (
        <button
          key={genre.name}
          type="button"
          className={
            selectedGenre === genre.id
              ? 'genre-button genre-button-active'
              : 'genre-button'
          }
          onClick={() => onSelectGenre(genre.id)}
          aria-pressed={selectedGenre === genre.id}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreButtons
