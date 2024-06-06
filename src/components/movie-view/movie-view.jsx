export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div>
        <img src={movie.ImageURL} />
      </div>
      <div>
        <span>Title:</span>
        <span className="movie-title">{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <div className="movie-description">{movie.Description}</div>
      </div>
      <div>
        <span>Genre: </span>
        <div className="movie-genre">{movie.Genre}</div>
      </div>
      <div>
        <span>Director: </span>
        <div className="movie-director">{movie.Director}</div>
      </div>
      <div>
        <span>Actors: </span>
        <div className="movie-actors">{movie.Actors}</div>
      </div>
      <div>
        <span>Year: </span>
        <div className="movie-year">{movie.Year}</div>
      </div>
      <div>
        <span>Rating: </span>
        <div className="movie-rating">{movie.Rating}</div>
      </div>
      <div>
        <span>ReleaseDate: </span>
        <div className="movie-runtime">{movie.ReleaseDate}</div>
      </div>
      <div>
        <span>Featured: </span>
        <div className="movie-runtime">{movie.Featured}</div>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};