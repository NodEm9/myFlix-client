import PropTypes from 'prop-types';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import { Favorite } from './favorite';
import { DeleteFavoriteMovie } from '../profile-view/delete-favoriteMovie';


export const MovieCard = ({ movie }) => {

  return (
    <Card className='h-100 movie-card'>
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Col className='d-flex justify-content-between'>
          <Card.Title className='fw-bold mb-3'>{movie.Title}</Card.Title>
          <Favorite movie={movie} /> 
          <DeleteFavoriteMovie movie={movie} />
        </Col>
        <Card.Text>{movie.Description}</Card.Text>
        <Col className='d-flex justify-content-between align-items-center mt-3'>
          <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Card.Text>{movie.Genre.map(g => (
            <span key={g._id}>{g.name}</span>
          ))}
          </Card.Text>
        </Col>
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
    ImageUrl: PropTypes.string,
    Rating: PropTypes.number,
    Featured: PropTypes.bool
  }).isRequired,
};