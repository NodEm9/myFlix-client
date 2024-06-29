import { useState, useEffect } from 'react';
import favoriteIcon from '../../img/favorite-icon.png';
import favoriteIcon2 from '../../img/favorite-icon2.png';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const FavoriteIcon = ({ movie }) => {
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
          console.log('Favorite added', data);
          setIsFavorited(true);
        }
      })
      .catch((error) => {
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
        if (data) {
          console.log('Favorite deleted', data);
          setIsFavorited(false);
        }
      }).catch((error) => {
        console.log(error)
        setIsFavorited(false);
      });
    setIsFavorited(false);
  };

  useEffect(() => {
    if (user && movie) {
      setIsFavorited(user.favoriteMovies.includes(movie._id));
    } else if (user || movie || !user.favoriteMovies.includes(movie._id)) {
      setIsFavorited(false);
    }
  }, [user, movie, user.favoriteMovies]);

  return (
    <div>
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
          disabled={isFavorited}
          onClick={addToFavorite}
        />
      )}
    </div>
  );
};