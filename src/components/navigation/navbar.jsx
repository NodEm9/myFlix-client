import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

export const Navbar = () => {
 let user = JSON.parse(localStorage.getItem("user"));
  const [loggedInUser, setLoggedInUser] = useState(user ? user.Username : "Guest");
 
  return (
    <Navbar className="bg-body p-0">
      <Container className='bg-body p-4'>
        <Navbar.Brand href="/" className="fw-bold fs-2">myFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          <Navbar.Text>
            <a href="/movies">Movies</a>
          </Navbar.Text>
          <Navbar.Text>
            <a href="/signup">Signup</a>
          </Navbar.Text>
          <Navbar.Text>
            Signed in as: <a href="/login">{loggedInUser}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

