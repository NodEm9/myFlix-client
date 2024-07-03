import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ToastNotification from "../toast/toast";
import { setUser, setLoggedIn, setToken } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";



const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShow(false);
    setValidated(true);
    // Form validation
    const Form = e.currentTarget;
    if (Form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    const data = {
      Username: username,
      Password: password
    };

    await fetch("https://myflix-app-led6.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)),
            localStorage.setItem("token", data.token),
            dispatch(
              setUser(data.user),
              setToken(data.token),
              setLoggedIn(true)
            );
          window.location.reload();
          setSuccessMessage("Login successful!");
          setShow(true); 

        } else {
          setShow(false);
          setErrMsg("Username or password is incorrect.");
        }
      }).catch((e) => {
        setShow(false);
        setErrMsg("Something went wrong.");
        console.log(e);
      });

    setValidated(false);
    setUsername("");
    setPassword("");
    setShow(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="form mt-5 pt-5">
      <Form.Group as={Col} controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          required
          minLength={5}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
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