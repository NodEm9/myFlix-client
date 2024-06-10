import PropTypes from 'prop-types';
import { CustomImage } from '../custom-image/custom-image';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (  
    <div
      className="movie-card" 
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <div className='movie-card__header'>
        <CustomImage src={movie.ImageUrl} alt={"Movie Poster"} />
      </div>
      <h3 className='movie-card__title'>{movie.Title}</h3>
      <p className='movie-card__description'>{movie.Description}</p>
      <p className='movie-card__genre'>Genre</p>
    </div>   
  );  
}; 

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.object),
    Director: PropTypes.arrayOf(PropTypes.object),
    Actor: PropTypes.arrayOf(PropTypes.string),
    ReleaseDate: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Rating: PropTypes.number, 
    Featured: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};