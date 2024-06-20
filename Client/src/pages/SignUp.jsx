import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";

const SignUp = () => {
  const { signUp, user } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [employeType, setEmployeType] = useState("Role 1");
  const [userRole, setUserRole] = useState("Client");

  const handleRegistration = async () => {
    if (!userName || !password || !passwordVerify) {
      setSignUpError("Please fill in all fields.");
      return;
    }
    if (password != passwordVerify) {
      setSignUpError("The passwords are not the same.");
      return;
    }
    if (!CheckPassword(password)) return;
    try {
      await signUp(userName, password, employeType, userRole);
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const CheckPassword = (password) => {
    // let psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
    // if (password.match(psw)) {
    return true;
    // } else {
    //     setSignUpError('Wrong password...! The password must contain letters and numbers');
    //     return false;
    // }
  };

  return (
    <div className="registration">
      <h2 className="title">Create Account</h2>
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
      <input
        type="password"
        className="input"
        value={passwordVerify}
        placeholder="password-verify"
        onChange={(e) => setPasswordVerify(e.target.value)}
      />
      <br />
      <select
        className="input"
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
      >
        <option value="Client">Client</option>
        {user.role == "Admin" && (
          <>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </>
        )}
      </select>
      <br />
      {userRole === "Employee" && (
        <select
          className="input"
          value={employeType}
          onChange={(e) => setEmployeType(e.target.value)}
        >
          <option value="Role 1">Role 1</option>
          <option value="Role 2">Role 2</option>
        </select>
      )}
      {signUpError && (
        <p className="error" style={{ color: "red" }}>
          {signUpError}
        </p>
      )}
      <button className="btnOkSignUp" onClick={handleRegistration}>
        Save
      </button>
      <br />
    </div>
  );
};

export default SignUp;
