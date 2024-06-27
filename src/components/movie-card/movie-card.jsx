import PropTypes from 'prop-types';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import { useState } from 'react';
import favoriteIcon from '../../img/favorite-icon.png';
import favoriteIcon2 from '../../img/favorite-icon2.png';
import { useSelector } from 'react-redux';

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
      }
    }).then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setIsFavorited(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    setIsFavorited(false);
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
        console.log('Favorite deleted', data);
        if (data) {
          console.log(data);
          setIsFavorited(false);
        }
      }).catch((error) => {
        console.log(error)
        setIsFavorited(false);
      });
    setIsFavorited(false);
  };   



  return (
    <Card className='h-100 movie-card'>
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Col className='d-flex justify-content-between'>
          <Card.Title className='fw-bold mb-3'>{movie.Title}</Card.Title>
          {!isFavorited && token ? (
            <Card.Img
              className='favorite-icon'
              src={favoriteIcon2}
              onClick={addToFavorite}
            />) : (
            <Card.Img
              className='favorite-icon'
              src={favoriteIcon}
              onClick={removeFavoriteMovie}
            />)}
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