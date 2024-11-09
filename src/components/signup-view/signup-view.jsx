import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import  ToastNotification  from "../toast/toast";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    setValidated(true);
    // Form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    await fetch("https://myflix-app-led6.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setShow(true);
        window.location.reload();
      } else {
        setErrMsg("Something went wrong.");
        setShow(false);
      }
    }).catch((e) => {
      setShow(false);
      console.log(e);
    });
    setValidated(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthday("");
    setShow(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="h-100 pb-5">
      <h1 className="fs-4 p-2 fw-semi-bold">Sign Up a myFlix account</h1>
      <Form.Group controlId="formUsername">
        <Form.Label className="label">Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          required
          placeholder="Enter username"
          minLength={5}
          onChange={(e) => setUsername(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label className="label">Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          required
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label className="label">Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          required
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label className="label">Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          required
          onChange={(e) => setBirthday(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Button type="submit" className="btn float-end mt-2">
        Sign Up
      </Button>
      {errMsg ? (
       show && <ToastNotification
          setShow={show}
          message={errMsg}
          txtColor="text-danger"
        />
      ) : ( 
        show && <ToastNotification
          setShow={show}
          message={successMessage}
          txtColor="text-success"
        />
      )
      }
    </Form>
  );
};