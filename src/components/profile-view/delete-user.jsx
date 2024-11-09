import React, { useState } from "react";
import './profile-view.scss';
import Button from "react-bootstrap/Button";
import ToastNotification from "../toast/toast";
import { setDeleteUser } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const DeleteUser = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();


  const handleDelete = async (e) => {
    e.preventDefault();
    await fetch(`https://myflix-app-led6.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        dispatch(setDeleteUser({
          user: localStorage.removeItem("user"),
          token: localStorage.removeItem("token")
        }));
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
    <div className="delete-user">
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