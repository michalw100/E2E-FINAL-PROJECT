import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuFiles } from "react-icons/lu";
import { ImProfile } from "react-icons/im";

const Client = ({ client }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/users/user?id=${client.userId}`,
  //         {
  //           method: "GET",
  //           credentials: "include",
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const userData = await response.json();
  //       setUser(userData);
  //       // console.log("client")
  //       // console.log(userData);
  //     } catch (error) {
  //       // console.error("Error fetching user:", error.message);
  //     }
  //   };

  //   if (client.userId) {
  //     fetchUser();
  //   }
  // }, [client.userId]);

  const saveUserDetailsToServer = async () => {
    try {
      const response = await fetch(`http://localhost:3000/storeClientID`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientID: client.userID }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // console.log("User details saved successfully");
    } catch (error) {
      console.error("Error saving user details:", error.message);
    }
  };

  const getUser = async() => {try {
    const response = await fetch(
      `http://localhost:3000/users/user?id=${client.userID}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    setUser(userData);
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }}

  const viewDetails = async () => {
    await saveUserDetailsToServer();
    navigate(`/userDetails/${client.userID}`, { state: { user } });
  };

  const viewFiles = async () => {
    await saveUserDetailsToServer();
    localStorage.removeItem("selectedTypeFile");
    navigate(`/myFiles/${client.userID}`);
    // navigate(`/myFiles/${client.client_id}`);
  };

  return (
    <div key={client.id} className="client">
      <h4 id=".clientDetails">
        {client.id}. {client.name}
      </h4>
      <p className="clientemail">{client.email} </p>

      <button className="mydetails" onClick={viewDetails}>
        <ImProfile />
      </button>
      <button className="mydetails" onClick={viewFiles}>
        <LuFiles />
      </button>
    </div>
  );
};

export default Client;
