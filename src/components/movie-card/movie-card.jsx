import PropTypes from 'prop-types';


export const MovieCard = ({ movie, onMovieClick }) => {
  return (  
    <div
      className="movie-card"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>   
  );  
}; 

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.object),
    Director: PropTypes.arrayOf(PropTypes.object),
    Actor: PropTypes.arrayOf(PropTypes.object),
    ReleaseDate: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Rating: PropTypes.number,
    Featured: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};