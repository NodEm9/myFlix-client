import { useState } from "react";
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
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
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
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          required
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="float-end mt-2">
        Submit
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