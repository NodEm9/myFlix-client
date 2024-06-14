import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import { Col } from "react-bootstrap" 

const Skeleton = () => { 
  return (
    <Row md={8} className="mt-5 justify-content-md-center">
      <Col md={5} className="hstack gap-3 justify-content-md-center">
      <Card className="movie-card p-5">
        <Card.Body>
          <Card.Title className="skeleton-title"></Card.Title>
          <Card.Text className="skeleton-text"></Card.Text>
          <Card.Text className="skeleton-text"></Card.Text>
          <Card.Text className="skeleton-text"></Card.Text>
          <Card.Text className="skeleton-text"></Card.Text>
        </Card.Body>
        <Card.Img variant="top" className="skeleton-image" />
      </Card>
      </Col>
    </Row>
  )
}

export default Skeleton