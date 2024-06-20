import { useState } from 'react';
import { Button } from 'react-bootstrap';

export const DeleteFavoriteMovie = ({ movie }) => { 
  let user = localStorage.getItem('user');
  user = user ? JSON.parse(user) : null;
  const token = localStorage.getItem('token');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteFavorite = () => {
    if (!user || !token) return;

    fetch(`https://movie-api-h54p.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log('Favorite deleted', data);
        setIsDeleted(true);
      }).catch((error) => {
        console.log(error);
        setIsDeleted(false);
      });
    console.log('Favorite deleted');
  }

  return (
    <Button
      className='favorite-icon'
      variant='danger'
      onClick={handleDeleteFavorite}
    >  
      x
    </Button>
  )
};