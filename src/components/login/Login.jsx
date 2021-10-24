import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.replace("/");
    }
  });
  async function login(e) {
      e.preventDefault();
    console.log(username, password);
    if (username === "admin1" && password === "admin1") {
      history.replace("/");
    }
    
  }

  return (
    <form>
      <div className="form-inner">
        <h2>Login Page</h2>
        <div>
          <input
            id="username"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" onClick={login} className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
