const genres = [
  { id: '', name: 'All' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 16, name: 'Animation' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 12, name: 'Adventure' },
  
]

function GenreButtons({ selectedGenre, onSelectGenre }) {
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
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreButtons
