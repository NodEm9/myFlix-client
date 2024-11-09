import React, { useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
 const ToastNotification = ({ message, txtColor}) => {
  const [show, setShow] = useState(true);
   const toggleShow = () => setShow(!show);
   
   setTimeout(() => {
      setShow(false);
   }, 5000);
   clearTimeout();

  return (
      <Row md={8} className='mt-md-5 pt-md-5'>
      <Col md={6} className="mb-2">
        <ToastContainer
          position="top-end"
          className="p-3"
        >
          <Toast show={show} onClose={toggleShow} delay={50000} autohide>
            <Toast.Header>
              <strong className="me-auto">System notification</strong>
            </Toast.Header>
            <Toast.Body className={`${txtColor}`} >{message}</Toast.Body>
          </Toast>
        </ToastContainer>
          </Col>
        </Row>
  );
};

export default ToastNotification;