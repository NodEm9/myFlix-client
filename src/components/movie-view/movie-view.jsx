export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div >
        <img src={movie.ImageUrl} key={movie.ImageUrl} />
      </div>
      <div>
        <span>Title:</span>
        <span className="movie-title" key={movie.Title}>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <div className="movie-description" key={movie.Description}>
          {movie.Description}
        </div>
      </div>
      <div>
        <span>Genre: </span>
        <span className="movie-genre">
          {movie.Genre.map(genre => (
            <div key={movie._id}>
              <span>{genre.name}</span>
              <p>{genre.description}</p>
            </div>
          ))}</span>
      </div>
      <div>
        <span>Director: </span>
        <div className="movie-director">
          {movie.Director.map(director => (
            <div key={director.name}>
              <span>{director.name}</span>
              <span>{director.bio}</span>
              <span>{director.birthyear}</span>
              <span>{director.deathyear}</span>
            </div>

          ))}</div>
      </div>
      <div>
        <span>Actors: </span>
        <div className="movie-actors">
          {movie.Actor.map(actor => (
            <div key={movie._id}>
              <span>{actor.name}</span>
              <span>{actor.birthyear}</span>
              <span>{actor.bio}</span>
            </div>

          ))}</div>
      </div>
      <div>
        <span>ReleaseDate: </span>
        <div className="movie-runtime" key={movie.ReleaseDate}>
          {movie.ReleaseDate}
        </div>
      </div>
      <div>
        <span>Rating: </span>
        <div className="movie-rating" key={movie.Rating}>
          {movie.Rating}
        </div>
      </div>
      <div>
        <span>Featured: </span>
        <div className="movie-runtime" key={movie.Featured}>
          {movie.Featured}
        </div>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};