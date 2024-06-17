import React, { useState, useContext, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../AuthContext";
import { useLocation } from "react-router";

const UserDetails = () => {
  const navigate = useNavigate();

  const { state } = useLocation();
  const { user: contextUser } = useContext(AuthContext);
  // const {setUser} = useContext(AuthContext);
  const user = state?.user || contextUser;
  // console.log("user")
  // console.log(user)

  const [signUpError, setSignUpError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: user?.name || "",
    userName: user?.userName || "",
    email: user?.email || "",
    street: user?.street || "",
    city: user?.city || "",
    zipcode: user?.zipcode || "",
    phone: user?.phone || "",
    deductionsFile: user?.deductionsFile || "",
    parentClientID: user?.parentClientID || "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        userName: user.userName || "",
        email: user.email || "",
        street: user.street || "",
        city: user.city || "",
        zipcode: user.zipcode || "",
        phone: user.phone || "",
        deductionsFile: user.deductionsFile || "",
        parentClientID: user.parentClientID || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const postUser = () => {
    if (
      userDetails.name === "" &&
      userDetails.userName === "" &&
      userDetails.street === "" &&
      userDetails.city === "" &&
      userDetails.email === "" &&
      userDetails.zipcode === "" &&
      userDetails.phone === "" &&
      userDetails.deductionsFile === "" &&
      userDetails.parentClientID === ""
    ) {
      setSignUpError("Please fill at least one field.");
      return;
    }

    const requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userDetails)
    };

    fetch(`http://localhost:3000/users?id=${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((updatedUser) => {
        // console.log(updatedUser)
        setUserDetails(updatedUser);
        setSignUpError("The user has been updated successfully");
        setTimeout(() => {
          navigate('/updates');
        }, 3000);
      })
      .catch((error) => {
        setSignUpError(error.message);
      });
  };

  return (
    <div className="registration">
      <h2 className="title">User Details</h2>
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.name || ""}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.userName || ""}
        name="userName"
        placeholder="userName"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.email || ""}
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.street || ""}
        name="street"
        placeholder="street"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.city || ""}
        name="city"
        placeholder="city"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.zipcode || ""}
        name="zipcode"
        placeholder="zipcode"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.phone || ""}
        name="phone"
        placeholder="phone"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.deductionsFile || ""}
        name="deductionsFile"
        placeholder="deductionsFile"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        className="input"
        value={userDetails.parentClientID || ""}
        name="parentClientID"
        placeholder="parentClientID"
        onChange={handleChange}
      />
      <br />
      {signUpError && (
        <p className="error" style={{ color: "red" }}>
          {signUpError}
        </p>
      )}
      <button className="Connect" onClick={postUser}>
        Save
      </button>
      <br />
    </div>
  );
};

export default UserDetails;
