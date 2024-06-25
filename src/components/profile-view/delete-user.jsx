import { useState } from "react";
import Button from "react-bootstrap/Button";
import  ToastNotification  from "../toast/toast";

export const DeleteUser = ({ user }) => {
  user = localStorage.getItem("user");
  user = user ? JSON.parse(user) : null;
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");


  const handleDelete = async (e) => {
    e.preventDefault();
    await fetch(`https://movie-api-h54p.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setSuccessMessage("Account deleted successfully!");
        window.location.href = "/";
        setShow(true);
      }
    }).catch((e) => {
      console.log(e);
      setErrMsg("Something went wrong.");
      setShow(true)
    });
    setToken(null);
  };

  return (
    <div>
      <Button
        variant="danger"
        onClick={handleDelete}
        className="delete-btn"
      >
        Delete Account
      </Button>
      {errMsg ? (
        show && <ToastNotification message={errMsg} txtColor={"text-danger"} show={show} />
      ) : (
        show && <ToastNotification message={successMessage} txtColor={"text-success"} show={show} />
      )}
    </div>
  );
}