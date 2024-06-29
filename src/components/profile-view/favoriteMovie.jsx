import { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setFavoriteMovies } from '../../redux/user/userSlice';



export const UserFavoriteMovies = ({ favoriteMovies }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Successfully fetch', data);
          dispatch(setFavoriteMovies(data.favoriteMovies));
        }
      }).catch((error) => {
        console.log(error);
      });

  }, [token, user.favoriteMovies]);


  return (
    <Row className="favorite-movies d-flex mt-4 h-100">
      {favoriteMovies.map((movie) => (
        <Col md={3} key={movie._id} className='p-3'>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

UserFavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired
};