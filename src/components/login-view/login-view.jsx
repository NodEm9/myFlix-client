import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "./login-view.scss";
import { ToastNotification } from "../toast/toast";


const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const toastMessage = {
    nonExist: "No such user found",
    credential: "Somthing went wrong"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    const Form = e.currentTarget;
    if (Form.checkValidity() === false) {
      e.stopPropagation();
    }

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
        } else {
          setErrMsg(toastMessage.nonExist);
          setShowToast(true);
        }
      }).catch((e) => {
        setErrMsg(toastMessage.credential);
        setShowToast(true);
        throw new Error(e);
      });
    setValidated(true);
  };


  return (
    <div>
      <div>
        {errMsg !== toastMessage.credential ?
          showToast && <ToastNotification message={toastMessage.credential} />
          : showToast && <ToastNotification message={toastMessage.nonExist} />
        }
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className=" mt-2">
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
        <Button variant="primary" type="submit" onClick={handleSubmit} className="mb-2 mt-2 float-end" >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginView;