import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movie }) => {

  return (
    <Card className='movie-card h-100 w-100'>
      <Card.Header className='p-0'>
        <Card.Img variant="top" src={movie.ImageUrl} alt={`Image of ${movie.Title}`} className='img' />
      </Card.Header>
      <Card.Body className='card-body'>
        <Card.Title className='movie-card__title fw-bold mb-3'>{movie.Title}</Card.Title>
        <Card.Text className='movie-card__description'>{movie.Description}</Card.Text>
      </Card.Body>
      <Card.Footer className='border-0  bg-transparent'>
        <Col className='d-flex justify-content-center gap-3 align-items-center mt-3'>
          <Link to={`/movie/${encodeURIComponent(movie._id)}`} className='text-white text-decoration-none'>
            <span className='link-btn p-2'>Open</span>
          </Link>
          <Card.Text className='p-2'>{movie.Genre.map(g => (
            <span key={g.name} className='link-btn p-2'>{g.name}</span>
          ))}
          </Card.Text>
        </Col>
      </Card.Footer>
    </Card>
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
    ImageUrl: PropTypes.string,
    Rating: PropTypes.number,
    Featured: PropTypes.bool
  }).isRequired,
};