import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import unhearted from '../../img/love-icon.svg';
import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { CurrentButtonContext } from "../../context/FavoriteContext";

function AddToFavorite({ movie, isFavorite }) {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [isFavorited, setIsFavorited] = useState(false);
  const [addMovieTitle, setAddMovieTitle] = useState('');

  const { currentButton, setCurrentButton } = useContext(CurrentButtonContext);

  useEffect(() => {
    // Add movie to favorite list
    const addToFavorite = async () => {
      setIsFavorited(false);
      isFavorite = false;

      fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${encodeURIComponent(movie._id)}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          if (data) {
            data = { ...user, favoriteMovies: [...user.favoriteMovies, movie._id] };
            console.log("Favorite movie added", data);
            localStorage.setItem('user', JSON.stringify(data));
            setIsFavorited(true);
            isFavorite = true;
          }
        })
        .catch((error) => {
          if (error.status === 0) {
            alert('Network error. Please try again later.');
          } else {
            throw new Error(error);
          }
        });

      setIsFavorited(true);
      isFavorite = true;
    };

    if (addMovieTitle) {
      addToFavorite();
    }
  }, [addMovieTitle, movie, isFavorite, isFavorited]);

  // Add movie to favorite list by clicking on the favorite icon2
  const handleAddMovie = () => {
    setAddMovieTitle(movie.Title);
  };

  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          if (currentButton) {
            setCurrentButton({
              currentButton: 'Add to Favorite',
            });
          }
          handleAddMovie();
        }
        }
        disabled={isFavorite}
        alt='hearted icon'
        className="favorite-button w-100 d-flex justify-content-center align-items-center text-white">
        <img src={unhearted} alt="unhearted icon" className="favorite-icon" />
        {currentButton === 'Add to Favorite' ? 'Add to Favorite' : 'Added to Favorite'}
      </Button>

    </>
  )
}

export default AddToFavorite