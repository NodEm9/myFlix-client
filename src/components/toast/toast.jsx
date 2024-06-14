import { useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const ToastNotification = ({ message }) => {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);
  let date = new Date();
  date.toLocaleString();


  return (
    <Row md={8} className='mt-md-5 pt-md-5'>
        <Col md={6} className="mb-2">
        <ToastContainer
          position="top-end"
          className="p-3"
        >
          <Toast show={show} onClose={toggleShow} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">System notification</strong>
              <small>{`${date.getMinutes().toLocaleString()} mins ago`}</small>
            </Toast.Header>
            <Toast.Body className='text-danger'>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
};

