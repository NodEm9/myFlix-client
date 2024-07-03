import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";

export const FooterView = () => {
  return (
    <Row className="footer bg-dark text-white text-center">
      <Col className="footer__copyright">
         &copy; 2024 myFlix. All Rights Reserved.
      </Col>
      <Col >   
        <Nav className="p-2 d-md-flex d-sm-flex flex-column gap-3">
          <Nav.Link href="/" className="text-primary fs-2 text-decoration-none">
            myFlix</Nav.Link>
          <Nav.Link href="/" className="text-white fs-6 text-decoration-none">
            Home</Nav.Link>
          <Nav.Link href="/profile" className="text-white fs-6 text-decoration-none">
            Users</Nav.Link>
          <Nav.Link href={"https://myflix-app-led6.onrender.com/documentation.html"} target="_blank" className="text-white fs-6 text-decoration-none">
           API Documentation</Nav.Link>
        </Nav>
      </Col>
    </Row>
  );
};