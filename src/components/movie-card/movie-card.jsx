import { useState, useEffect, use } from 'react';
import favoriteIcon from '../../img/favorite-icon.png';
import favoriteIcon2 from '../../img/favorite-icon2.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import { useSelector, } from 'react-redux';
import { setFavoriteMovies } from '../../redux/user/userSlice';


export const MovieCard = ({ movie }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [isFavorited, setIsFavorited] = useState(false);


  const addToFavorite = async () => {
    setIsFavorited(false);

    fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({favoriteMovies: movie._id})
    }).then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Favorite added', data);
          if (user) {
            setFavoriteMovies(data);
            setIsFavorited(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsFavorited(true);
  }

  const removeFavoriteMovie = async () => {
    setIsFavorited(true);
    fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log('Favorite deleted', data);
          setFavoriteMovies([]);
          setIsFavorited(false);
        }

      }).catch((error) => {
        console.log(error);
      });
    setIsFavorited(false);
  };

  useEffect(() => {
    if (user && movie) {
      setIsFavorited(user.favoriteMovies.includes(movie._id));
    } else {
      setIsFavorited(false);
    }
  }, [user, movie, user.favoriteMovies]);



  return (
    <Card className='h-100 movie-card'>
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Col className='d-flex justify-content-between'>
          <Card.Title className='title fw-bold mb-3'>{movie.Title}</Card.Title>
          {isFavorited ? (
            <Card.Img
              src={favoriteIcon}
              onClick={removeFavoriteMovie}
              disabled={isFavorited}
              className='favorite-icon'
            />
          ) : (
            <Card.Img
              className='favorite-icon'
              src={favoriteIcon2}
              onClick={addToFavorite}
            />
          )}
        </Col>
        <Card.Text>{movie.Description}</Card.Text>
        <Col className='d-flex justify-content-between align-items-center mt-3'>
          <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Card.Text>{movie.Genre.map(g => (
            <span key={g.name}>{g.name}</span>
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
    Actor: PropTypes.arrayOf(PropTypes.object),
    ReleaseDate: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string,
    Rating: PropTypes.number,
    Featured: PropTypes.bool
  }).isRequired,
};