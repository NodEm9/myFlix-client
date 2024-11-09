import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import FavoriteProvider from '../../context/FavoriteContext';
import RemoveFromFavorite from './removeFavorite';


export const UserFavoriteMovies = ({ favoriteMovies }) => {

  return (
    <Row className="d-flex flex-column w-100 mt-1 h-100 sm-justify-content-center">
      {favoriteMovies.map((movie) => (
        <Col md={3} key={movie._id} className='p-1'>
          <FavoriteProvider movie={movie}>
            <div className='d-flex gap-2 align-items-center'>
            <RemoveFromFavorite movie={movie} isFavorite={false} />
            {movie.Title}
            </div>
          </FavoriteProvider>
        </Col>
      ))}
    </Row>
  );
}

UserFavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};