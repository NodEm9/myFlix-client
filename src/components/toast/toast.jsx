import { useState } from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
 const ToastNotification = ({ message, txtColor}) => {
  const [show, setShow] = useState(true);
  const [tick, setTick] = useState(0);

  const toggleShow = () => setShow(!show);

  // Create a function to keep track of time  
  const getTimer =  (time) => {
    let date = new Date(); 
    date.getTime(time).toLocaleString();
    setInterval(() => {
      if (show) {
        setTick(time + 1);
      } 
    }, 6000)
    return time;
  };

    // Create a variable to hold the current time 
  //and call the timeKeeper function
  let time = getTimer(tick);


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
              <small>{`${time} seconds ago`}</small>
            </Toast.Header>
            <Toast.Body className={`${txtColor}`} >{message}</Toast.Body>
          </Toast>
        </ToastContainer>
          </Col>
        </Row>
  );
};

export default ToastNotification;