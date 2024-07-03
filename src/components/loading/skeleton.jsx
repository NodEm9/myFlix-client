import React from "react"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import { Col } from "react-bootstrap"
import "./loading-skeleton.scss"



const Skeleton = () => {
  return (
    <Row  className="justify-content-center">
      {Array.from({ length: 12 }).fill(0).map((_, index) => (
        <Col md={3} key={index} className="d-flex m-3  justify-content-center gap-5" >
          <Card className="skeleton">
            <div className="skeleton__header"></div>
            <div className="skeleton__title"></div>
            <div className="skeleton__description"></div>
            <div className="skeleton__genre"></div>
          </Card> 
      </Col>
      ))}

    </Row>
  )
}
export default Skeleton