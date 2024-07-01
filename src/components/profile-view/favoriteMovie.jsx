import { useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { setFavoriteMovies } from '../../redux/user/userSlice';



export const UserFavoriteMovies = ({ favoriteMovies }) => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const updateOptimisticUI = () => {
      setFavoriteMovies(user.favoriteMovies);
    };

    return () => {
      updateOptimisticUI();
    };
  }, [user.favoriteMovies, favoriteMovies]);


  return (
    <Row className="favorite-movies d-flex mt-4 h-100">
      {favoriteMovies.map((movie) => (
        <Col md={3} key={movie._id} className='p-3'>
          <MovieCard
            movie={movie}
          />
        </Col>
      ))}
    </Row>
  );
}

UserFavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};