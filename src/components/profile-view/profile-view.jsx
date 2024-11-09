import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { UpdateUserData } from './updateUser';
import { DeleteUser } from './delete-user';
import { UserFavoriteMovies } from './favoriteMovie';
import PropTypes from 'prop-types'
import './profile-view.scss';



export const ProfileView = ({ movies }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const favoriteMovies = movies.filter((movie) =>
    user.favoriteMovies.includes(movie._id));

  return (
    <Row className="h-100 w-100 mt-5">
      <Row className='profile-view mx-auto'>
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
        {/* Update User Data form */}
        <Col className='h-100'>
          {showUpdateForm ? (
            <UpdateUserData user={user} setShowUpdateForm={setShowUpdateForm} />
          ) : (
            <Button
              onClick={() => setShowUpdateForm(true)}
              className='update-btn w-50 float-end my-4'
            >
              Update Account
            </Button>
          )}
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col className='my-4'>
          <DeleteUser />
        </Col>
      </Row>
      <hr className='my-4' />
      {/* List favorite Movies */}
      <Row className='justify-content-center'>
        <h2 className='fw-bold ml-0'>Favorite Movies</h2>
        <Col className='justify-content-center'>
          {favoriteMovies.length === 0 ? (
            <div className='text-center fw-4'>You have no favorite movies.</div>
          ) : (
            <UserFavoriteMovies favoriteMovies={favoriteMovies} user={user} />
          )}
        </Col>
      </Row>
    </Row>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
