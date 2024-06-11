import { FaArrowLeft } from "react-icons/fa6";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view">
      <div className="movie-view__img">
        <img src={movie.ImageUrl} key={movie.ImageUrl} className="img-wiew" />
      </div>
      <div className="movie-view__content">
        <div className="movie-view__title">
          <span>Title:</span>
          <p className="movie-title" key={movie.Title}>{movie.Title}</p>
        </div>
        <div className="movie-view__description">
          <h3>Description: </h3>
          <p className="movie-description" key={movie.Description}>
            {movie.Description}
          </p>
        </div>
        <div className="movie-view__genre">
          <h3>Genre: </h3>
          <span className="movie-genre">
            {movie.Genre.map(genre => (
              <div key={genre}>
                <span>{genre.name}</span>
                <p>{genre.description}</p>
              </div>
            ))}</span>
        </div>
        <div className="movie-view__director">
          <h3>Director: </h3>
          {movie.Director.map(director => (
            <div key={director.name} className="movie-director">
              <p><span>Name:</span> {director.name}</p>
              <p className="director-bio">
                <span>Biblograph:</span>
                <em className="bio">{director.bio}</em>
              </p>
              <p><span>Birthdate:</span> {director.birthyear}</p>
              <p><span>Deathyear:</span> {director.deathyear}</p>
            </div>

          ))}
        </div> 
        <div className="movie-view__actor">
          <h3>Actors: </h3>
          <div className="movie-actors">
            {movie.Actor.map(actor => (
              <div key={actor.name} className="actor">
                <p>{actor}</p>
              </div>

            ))}</div>
        </div>
        <div className="movie-view__release-date">
          <h3>ReleaseDate: </h3>
          <div className="movie-runtime" key={movie.ReleaseDate}>
            {movie.ReleaseDate}
          </div>
        </div>
        <div className="movie-view__rating">
          <h3>Rating: </h3>
          <div className="movie-rating" key={movie.Rating}>
            {movie.Rating}
          </div>
        </div>
        <div className="movie-view__featured">
          <h3>Featured: </h3>
          <div className="movie-runtime" key={movie.Featured}>
            {movie.Featured}
          </div>
        </div>
        <div>
          <button className="back-button" onClick={onBackClick}>
            <FaArrowLeft />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};