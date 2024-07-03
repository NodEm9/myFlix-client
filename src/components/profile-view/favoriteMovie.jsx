import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';


export const UserFavoriteMovies = ({ user, favoriteMovies }) => {
  return (
    <Row className="favorite-movies d-flex mt-4 h-100">
      {favoriteMovies.map((movie) => (
        <Col md={3} key={movie._id} className='p-3'>
          <MovieCard
            movie={movie}
            isFavorite={user.favoriteMovies.includes(movie._id)}
          />
        </Col>
      ))}
    </Row>
  );
}

UserFavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};