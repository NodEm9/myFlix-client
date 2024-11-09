import React, { useState } from "react";
import './profile-view.scss';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToastNotification from "../toast/toast";


export const UpdateUserData = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
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

    setShow(false);
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

    fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        setSuccessMessage("Account updated successfully!");
        setShow(true);
      } else {
        setErrMsg("Something went wrong.");
        setShow(false);
      }
    }).catch((e) => {
      console.log(e);
    });
    setValidated(false);
    setUser(data)
    setToken(token);
    setUsername("");
    setPassword("");
    setEmail("");
    setBirthday("");
    setShow(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="px-md-5 h-100">
      <h2 className='fw-semi-bold fs-4 mb-3'>Update Profile</h2>
      <Form.Group controlId="formUsername">
        <Form.Label className="pt-1 pb-1">Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="Username"
          required
          minLength={5}
          onChange={(e) => setUsername(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label className="pt-1 pb-1">Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label className="pt-1 pb-1">Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label className="pt-1 pb-1">Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          required
          onChange={(e) => setBirthday(e.target.value)}
          className="input-group"
        />
      </Form.Group>
      <Form.Group controlId="formSubmit">
      <Button type="submit" className="mt-2 float-end">
        Update
        </Button>
      </Form.Group>
      {errMsg ?
        show && <ToastNotification message={errMsg} txtColor="text-danger" />
        : show && <ToastNotification message={successMessage} txtColor="text-success" />
      }
    </Form>
  )
};