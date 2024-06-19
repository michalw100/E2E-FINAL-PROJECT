import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";

const UserDetails = () => {
  const { user, setUser } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [signUpError, setSignUpError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: currentUser?.name || "",
    userName: currentUser?.userName || "",
    email: currentUser?.email || "",
    street: currentUser?.street || "",
    city: currentUser?.city || "",
    zipcode: currentUser?.zipcode || "",
    phone: currentUser?.phone || "",
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getClientID", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.clientID) {
          const clientResponse = await fetch(
            `http://localhost:3000/users/user?id=${data.clientID}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const client = await clientResponse.json();
          setCurrentUser(client);
        } else {
          setCurrentUser(user);
        }
      } catch (error) {
        setCurrentUser(user);
      }
    };

    fetchClientData();
  }, [user, location]);

  useEffect(() => {
    if (currentUser) {
      setUserDetails({
        name: currentUser.name || "",
        userName: currentUser.userName || "",
        email: currentUser.email || "",
        street: currentUser.street || "",
        city: currentUser.city || "",
        zipcode: currentUser.zipcode || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

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
      userDetails.phone === ""
    ) {
      setSignUpError("Please fill at least one field.");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userDetails),
    };

    fetch(
      `http://localhost:3000/users/user?id=${currentUser.id}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          setSignUpError(response.message);
          return;
        }
        return response.json();
      })
      .then((updatedUser) => {
        if (updatedUser) {
          setUserDetails(updatedUser);
          setSignUpError("The user has been updated successfully");
          setUser(updatedUser);
          // setTimeout(() => {
          //   navigate("/updates");
          // }, 3000);
        }
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
      {signUpError && (
        <p
          className="error"
          style={{
            color:
              signUpError == "The user has been updated successfully"
                ? "green"
                : "red",
          }}
        >
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
