import { useState } from "react";

export const SignupView = () => { 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
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
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful!");
        window.location.reload();
      } else {
        alert("Something went wrong. Please try again.");
      } 
    }).catch((e) => {
        console.log(e);
      });
  };
  
  return (
    <div className="forms">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">
          Username:
          <input
            type="text"
            value={username}
            required
            minLength={4}
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
        <label htmlFor="Email">
          Email:
          <input
            type="email"
            value={email}
            required
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="Birthday">
          Birthday:
          <input
            type="date"
            value={birthday}
            required
            id="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};