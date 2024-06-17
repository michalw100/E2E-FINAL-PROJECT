import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import Footer from "../components/Footer";
import "../App.css";

function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  // const [userName, setUserName] = useState("Client 4");
  const [userName, setUserName] = useState("Employee 8");
  // const [password, setPassword] = useState("4");
  const [password, setPassword] = useState("18");

  const handleLogin = async () => {
    if (!userName || !password) {
      setLoginError("Please fill in all fields.");
      return;
    }
    try {
      await signIn(userName, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="registration">
      <h2 className="title">Sign in</h2>
      <br />
      <input
        type="text"
        className="input"
        value={userName}
        placeholder="user name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        type="password"
        className="input"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {loginError && (
        <p className="error" style={{ color: "red" }}>
          {loginError}
        </p>
      )}
      <button className="btnOkLogIn" onClick={handleLogin}>
        Connect
      </button>
      <Footer />
    </div>
  );
}
export default SignIn;
