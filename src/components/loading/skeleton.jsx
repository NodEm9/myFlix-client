import { Col, Row } from "react-bootstrap"
import Card from "react-bootstrap/Card"

const Skeleton = () => {

  return (
    <Row md={12} className="card-container">
      <Col md={8} className="p-5 gap-3" >
        {Array.from({ length: 12 }).fill(0).map((_, index) => (
          <Card key={index} className="skeleton">
            <div className="skeleton__header"></div>
            <div className="skeleton__title"></div>
            <div className="skeleton__description"></div>
            <div className="skeleton__genre"></div>
          </Card>
        ))}
      </Col>
    </Row>
  )
}

export default Skeleton