import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ movie }) => { 
  return (  
    <Card className='h-100 movie-card'> 
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Card.Title className='fw-bold mb-3'>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
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
};