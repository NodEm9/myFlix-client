import { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import "./profile-view.scss";
import bin from '../../img/bin.svg'

const RemoveFromFavorite = ({ movie, isFavorite }) => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [isFavorited, setIsFavorited] = useState(false);
  const [removeMovieTitle, setRemoveMovieTitle] = useState('');


  useEffect(() => {
    // Remove movie from favorite list
    const removeFavoriteMovie = async () => {
      isFavorite = false;
      setIsFavorited(false);;
      fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}/movies/${encodeURIComponent(movie._id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          if (data) {
            data = { ...user, favoriteMovies: user.favoriteMovies.filter(favMovie => favMovie !== movie._id) };
            console.log("Favorite movie removed", data);
            localStorage.setItem('user', JSON.stringify(data));
            isFavorite = false;
            setIsFavorited(false);
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.status === 0) {
            alert('Network error. Please try again later.');
          } else {
            throw new Error(error);
          }
        });
        setIsFavorited(false);
      isFavorite = false;
    };

    if (removeMovieTitle) {
      removeFavoriteMovie();
    }
  }, [removeMovieTitle, movie, isFavorite, isFavorited]);

  // Remove movie from favorite list
  const handleRemoveMovie = () => {
    setRemoveMovieTitle(movie.Title);
  };

  return (
      <button
        onClick={() => handleRemoveMovie()}
        disabled={isFavorite}
        alt='bin icon'
        className="d-flex justify-content-center bg-transparent border border-none align-items-center">
        <img src={bin} alt="hearted icon" className="favorite-icon" />
      </button>
  )
}

export default RemoveFromFavorite