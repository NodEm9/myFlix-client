import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';


export const NavigationBar = ({ onLoggedOut }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <Navbar expand="lg">
      <Container fluid className="bg-light fixed-top px-5">
        <Nav>
          <Navbar.Brand href='/' className="website-name d-md-flex align-items-center fw-bold fs-2">
            myFlix
          </Navbar.Brand>
          <Navbar.Text className="home fs-5">
            <Nav.Link href="/">Home</Nav.Link>
          </Navbar.Text>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"
          className="justify-content-end text-center gap-3">
          <Nav className='gap-3'>
            <Navbar.Text className="m-3">
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Navbar.Text>
            {onLoggedOut && !user ? (
              <Navbar.Text className="m-3">
                <Nav.Link href="/login">Login</Nav.Link>
              </Navbar.Text>
            ) : (
              <Navbar.Text className="m-3">
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> 
              </Navbar.Text>
            )}
            <Navbar.Text className="m-3">
              <Nav.Link href="/profile">Profile</Nav.Link>
            </Navbar.Text>
            <Navbar.Text className='btn-nav m-3 px-4 p-1 text-white d-flex align-items-center rounded-pill gap-2'>
              <Nav.Link href="/profile" className="text-white fs-5">
                Signed in as: {user ? user.Username : "Guest"}
              </Nav.Link>
            </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

