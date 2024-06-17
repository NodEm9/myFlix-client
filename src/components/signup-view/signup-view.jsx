import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastNotification } from "../toast/toast";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const defaultErrorMessage =  "Somthing went wrong"
  

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    await fetch("https://movie-api-h54p.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(response => {
        if (response.ok) {
          setSuccessMsg(response.message);
          window.location.reload();
          setShowToast(true);
        }else {
          setErrMsg(response.message);
          setShowToast(true);
        }
      }).catch((e) => {
        console.log(e?.response.message);
        setErrMsg(e.message);
      })

    setValidated(true);
  };

  return (
    <div>
      <div>
      {successMsg ? showToast && <ToastNotification message={successMsg} txtColor={'text-success'} />
          : !errMsg && !successMsg ? showToast && <ToastNotification message={defaultErrorMessage} txtColor={'text-danger'} />
            : null
        } 
        {errMsg ? showToast && <ToastNotification message={errMsg} txtColor={'text-warning'} />
            : !errMsg && !successMsg ? showToast && <ToastNotification message={defaultErrorMessage} txtColor={'text-danger'} />
              : null
        }
      </div>
   
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
      </Form>
    </div>
  );
};