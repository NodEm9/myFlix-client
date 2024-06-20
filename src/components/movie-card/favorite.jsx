import { useState } from 'react';
import favoriteIcon from '../../img/favorite-icon.png';
import favoriteIcon2 from '../../img/favorite-icon2.png';
import Card  from 'react-bootstrap/Card';


export const Favorite = ({ movie }) => { 
  let user = localStorage.getItem('user');
  user = user ? JSON.parse(user) : null;
  const token = localStorage.getItem('token');
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddFavorite = () => { 
    if (!user) return;
    if (!token) return;
    fetch(`https://movie-api-h54p.onrender.com/users/${user.Username}/movies/${movie._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((data) => {
        if(data) {
          console.log(data);
          setIsFavorited(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    console.log('Favorite added');
    setIsFavorited(!isFavorited);
  }

  return (
    <Card.Img
      className='favorite-icon'
      src={isFavorited && movie ?  favoriteIcon :  favoriteIcon2 }
      onClick={handleAddFavorite} />
  ) 
};