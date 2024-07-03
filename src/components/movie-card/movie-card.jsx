import React, { useState, useEffect } from 'react';
import favoriteIcon from '../../img/favorite-icon.png';
import favoriteIcon2 from '../../img/favorite-icon2.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-card.scss';
import { useSelector } from 'react-redux';


export const MovieCard = ({ movie, isFavorite }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [isFavorited, setIsFavorited] = useState(false);

  const [addMovieTitle, setAddMovieTitle] = useState('');
  const [removeMovieTitle, setRemoveMovieTitle] = useState('');

  useEffect(() => {

    // Add movie to favorite list
    const addToFavorite = async () => {
      setIsFavorited(false);
      isFavorite = false;

      fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${movie._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          if (data) {
            data = { ...user, favoriteMovies: [...user.favoriteMovies, movie._id] };
            console.log('Favorite added', data);
            localStorage.setItem('user', JSON.stringify(data));
            setIsFavorited(true);
            isFavorite = true;
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setIsFavorited(true);
      isFavorite = true;
    };

    // Remove movie from favorite list
    const removeFavoriteMovie = async () => {
      setIsFavorited(true);
      isFavorite = true;

      fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${encodeURIComponent(movie._id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => response.json())
        .then((data) => {
          if (data) {
            console.log('Favorite deleted', data);
            data = { ...user, favoriteMovies: user.favoriteMovies.filter((m) => m !== movie._id) };
            localStorage.setItem('user', JSON.stringify(data));
            setIsFavorited(false);
            isFavorite = false;
            window.location.reload();
          }

        }).catch((error) => {
          console.log(error);
        });
      setIsFavorited(false);
      isFavorite = false;
    };


    if (addMovieTitle) {
      addToFavorite();
    }

    if (removeMovieTitle) {
      removeFavoriteMovie();
    }

  }, [addMovieTitle, removeMovieTitle, movie, user, token, isFavorite, isFavorited]);

  // Add movie to favorite list by clicking on the favorite icon2
  const handleAddMovie = (e) => {
    e.preventDefault();
    setAddMovieTitle(movie.Title);
  }

  // Remove movie from favorite list by clicking on the favorite icon
  const handleRemoveMovie = (e) => {
    e.preventDefault();
    setRemoveMovieTitle(movie.Title);
  }

  useEffect(() => {
    if (user && movie) {
      setIsFavorited(user.favoriteMovies.includes(movie._id));
      isFavorite = true;
    } else {
      setIsFavorited(false);
      isFavorite = false;
    }
  }, [user, movie, user]);


  return (
    <Link to={`/movie/${encodeURIComponent(movie._id)}`}>
    <Card className='h-100 movie-card'>
      <Card.Img variant="top" src={movie.ImageUrl} />
      <Card.Body>
        <Col className='d-flex justify-content-between'>
          <Card.Title className='title fw-bold mb-3'>{movie.Title}</Card.Title>
          {isFavorite && isFavorited ? (
            <Card.Img
              src={favoriteIcon}
              onClick={handleRemoveMovie}
              disabled={isFavorite}
              className='favorite-icon'
            />
          ) : (
            <Card.Img
              className='favorite-icon'
              src={favoriteIcon2}
              onClick={handleAddMovie}
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
    </Link>
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