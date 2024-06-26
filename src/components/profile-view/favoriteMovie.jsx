import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';


export const UserFavoriteMovies = ({ favoriteMovies }) => {
  return (
    <Row className="favorite-movies d-flex mt-4 h-100">
      {favoriteMovies.map((movie) => (
        <Col md={3} key={movie._id}>
          <MovieCard
            movie={movie}
          />
        </Col>
      ))}
    </Row>
  );
}
 
UserFavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired
};