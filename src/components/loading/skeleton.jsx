import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import { Col } from "react-bootstrap"
import "./loading-skeleton.scss"

const Skeleton = () => {
  let loadingCard = new Array(8).fill(0)

  return (
    <Row md={12} className="mt-5 justify-content-md-center">   
      <Col md={5}  className="skeleton vstack gap-3">
      {loadingCard.map((index) => (
            <Card key={index} className="skeleton-card">
              <Card.Body>
                <Card.Title className="skeleton-title"></Card.Title>
                <Card.Text className="skeleton-text"></Card.Text>
              </Card.Body>
        </Card>
      ))}
        </Col>
    </Row>
  )
}

export default Skeleton