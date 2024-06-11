import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        }else{
          alert("No such user found. Please try again.");
        }
      }).catch((e) => {
        alert("Something went wrong"); 
      });
  };

  return (
    <div className="forms">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">
          Username:
          <input
            type="text"
            value={username}
            required
            minLength={5}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="Password">
          Password:
          <input
            type="password"
            value={password}
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="submitBtn">Submit</button>
      </form>
    </div>
  );
};