import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (  
    <Card
      onClick={() => onMovieClick(movie)}
      className='h-100'
    > 
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() =>
          onMovieClick(movie)} variant="link"
        >
          Open
        </Button>
      </Card.Body> 
    </Card>   
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