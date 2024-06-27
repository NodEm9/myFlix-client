import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UpdateUserData } from './updateUser';
import { DeleteUser } from './delete-user';
import { UserFavoriteMovies } from './favoriteMovie';
import { useSelector } from 'react-redux';


export const ProfileView = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem("token");
  const movies = useSelector((state) => state.movies.movies);
  const favoriteMovies = user === undefined ? [] : movies.filter((movie) => user.favoriteMovies.includes(movie._id));

  useEffect(() => {
    if (!token) return;

    fetch(`https://myflix-app-led6.onrender.com/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          return {
            Username: user.Username,
            Password: user.Password,
            Email: user.Email,
            Birthday: user.Birthday,
            favoriteMovies: data.user.favoriteMovies
          };
        }
      }).catch((error) => {
        console.log(error);
      });
    
  }, [token, user]);



  return (
    <Row className="profile-view d-flex mt-4 h-100">
      <h2 className='fw-bold'>Account Information</h2>
      <Col className='fs-5'>
        <div className="username">
          <span className="label fw-semibold">Username: </span>
          <span className="value">{user.Username}</span>
        </div>
        <div className="email">
          <span className="label fw-semibold">Email: </span>
          <span className="value">{user.Email}</span>
        </div>
        <div className="birthday">
          <span className="label fw-semibold">Birthday: </span>
          <span className="value">{user.Birthday.slice(0, 10)}</span>
        </div>
        <div>
          <span className="label fw-semibold">Role: </span>
          <span className='value'>{user.Role}</span>
        </div>
      </Col>
      <Col className='my-4'>
        <UpdateUserData user={user} />
      </Col>
      <Row className='d-flex justify-content-center'>
        <Col className='my-4'>
          <DeleteUser  />
        </Col>
      </Row>
      <hr className='my-4' />
      <Row className='d-flex justify-content-center'>
        <h2 className='fw-bold'>Favorite Movies</h2>
        <Col className='d-flex justify-content-center'>
          {favoriteMovies.length === 0 ?
           <div className='fs-5'>No favorite movies yet!</div> 
            :  favoriteMovies && <UserFavoriteMovies  favoriteMovies={favoriteMovies} /> 
          }
        </Col>
      </Row>
    </Row>
  );
};
