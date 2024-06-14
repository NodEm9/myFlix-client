import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';

export const Navigationbar = () => {
 let user = JSON.parse(localStorage.getItem("user"));
  const [loggedInUser, setLoggedInUser] = useState(user ? user.Username : "Guest");
 
  return (
    <Navbar className="bg-body p-0 mb-5 ">
      <Container className='bg-body p-4 fixed-top border-bottom'> 
        <Navbar.Brand href="/" className="fw-bold fs-2">myFlix</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/login">{loggedInUser}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

