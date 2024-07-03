import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UpdateUserData } from './updateUser';
import { DeleteUser } from './delete-user';
import { UserFavoriteMovies } from './favoriteMovie';
import PropTypes from 'prop-types'
import './profile-view.scss';



export const ProfileView = ({ movies }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const favoriteMovies = movies.filter((movie) => user.favoriteMovies.includes(movie._id)); 


  return (
    <Row className="h-100">
      <Row className='profile-view'>
        <Col className='profile fs-5'>
          <h2 className='fw-bold'>Account Information</h2>
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
          {favoriteMovies && <UserFavoriteMovies user={user} favoriteMovies={favoriteMovies} />}
        </Col>
      </Row>
    </Row>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
