import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const FooterView = () => {
  return (
    <Row className="bg-dark text-center p-3 pb-5 mt-5 d-md-flex d-sm-flex">
      <Col>
          <p className="text-muted text-white ">
            Built by
          <a href="https://github.com/NodEm9" target="_blank" className="text-white">
            Emmanuel</a> for educational purposes.
        </p>
      </Col>
      <Col className="pb-5 d-md-flex d-sm-flex flex-column gap-3">
            <a href="/" className="text-primary fs-2 text-decoration-none">myFlix</a>
            <a href="/movies" className="text-white fs-6">Movies</a>
            <a href="#" className="text-white fs-6">Categories</a>
      </Col>
    </Row>
  );
};