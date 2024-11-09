import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FooterView = () => {
  return (
    <Row md={12} className="footer h-100 bg-dark text-white justify-content-center text-center pt-5 px-5">
      <Col md={8} className="text-white text-center px-4">
          <a href="/" className="text-primary fs-2 text-decoration-none">
            myFlix</a>
        <div className="text-wrap">Designed &#38; developed by Emmanuel Nodolomwanyi &copy; Copyright 2024.</div>
      </Col>
    </Row>
  );
}; 