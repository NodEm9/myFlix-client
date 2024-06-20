import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export const FooterView = () => {
  return (
    <Row className="bg-dark text-white text-center p-3 d-md-flex d-sm-flex">
      <Col className="p-5">
         &copy; 2024 myFlix. All Rights Reserved.
      </Col>
      <Col >
        <Nav className="p-2 d-md-flex d-sm-flex flex-column gap-3">
          <Nav.Link href="/" className="text-primary fs-2 text-decoration-none">
            myFlix</Nav.Link>
          <Nav.Link href="/movies" className="text-white fs-6 text-decoration-none">
            Movies</Nav.Link>
          <Nav.Link href="/users" className="text-white fs-6 text-decoration-none">
            Users</Nav.Link>
          <Nav.Link href="/" className="text-white fs-6 text-decoration-none">
            About Us</Nav.Link>
          
        </Nav>
      </Col>
    </Row>
  );
};