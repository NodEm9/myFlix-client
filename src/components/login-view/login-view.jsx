import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  Col  from "react-bootstrap/Col";
import "./login-view.scss"; 
import ToastNotification from "../toast/toast";


const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const Form = e.currentTarget;
    if (Form.checkValidity() === false) {
      e.stopPropagation();
    }

    console.log(username, password);
    const data = {
      Username: username,
      Password: password
    };

    await fetch("https://movie-api-h54p.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          window.location.reload();
          setSuccessMessage("Login successful!");
          setShow(true);
        } else {
          setShow(true);
          setErrMsg("Username or password is incorrect.");
        }
      }).catch((e) => {
        setShow(false);
        setErrMsg("Something went wrong.");
        console.log(e);
      });
    
    setValidated(true);
    setUsername("");
    setPassword("");
    setShow(true);
  };
 
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form mt-5  pt-5">
      <Form.Group as={Col} controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          required
          minLength={5}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-5 mt-2 float-end" >
        Submit
      </Button>
      {errMsg ?
        show && <ToastNotification message={errMsg} txtColor="text-danger" />
        : show && <ToastNotification message={successMessage} txtColor="text-success" />  
      }
    </Form>
  ); 
};

export default LoginView;