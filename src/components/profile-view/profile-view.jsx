import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UpdateUserData } from './updateUser';
import { DeleteUser } from './delete-user';
import { UserFavoriteMovies } from './favoriteMovie';
import { useSelector } from 'react-redux';
import './profile-view.scss';



export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user.user);
  const favoriteMovies = movies.filter((movie) =>  user.favoriteMovies.includes(movie._id));

  return (
    <Row className="mt-4 h-100">
      <h2 className='fw-bold'>Account Information</h2>
      <Row className='profile-view'>
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
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='my-4'>
          <DeleteUser />
        </Col>
      </Row>
      <hr className='my-4' />
      <Row className='d-flex justify-content-center'>
        <h2 className='fw-bold'>Favorite Movies</h2>
        <Col className='d-flex justify-content-center'>
          <UserFavoriteMovies favoriteMovies={favoriteMovies} />
        </Col>
      </Row>
    </Row>
  );
};
