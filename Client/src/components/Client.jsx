import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuFiles } from "react-icons/lu";
import { ImProfile } from "react-icons/im";

const Client = ({ client }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users?id=${client.client_user_id}`,
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
        // console.log("client")
        // console.log(userData);
      } catch (error) {
        // console.error("Error fetching user:", error.message);
      }
    };

    if (client.client_user_id) {
      fetchUser();
    }
  }, [client.client_user_id]);

  const saveUserDetailsToServer = async () => {
    try {
      const response = await fetch(`http://localhost:3000/storeClientID`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientID: user.id }),
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

  const viewDetails = async () => {
    await saveUserDetailsToServer();
    navigate(`/userDetails/${client.client_id}`, { state: { user } });
  };

  const viewFiles = async () => {
    await saveUserDetailsToServer();
    localStorage.removeItem("selectedTypeFile");
    navigate(`/myFiles`);
    // navigate(`/myFiles/${client.client_id}`);
  };

  return (
    <div className="client">
      <h4 id=".clientDetails">
        {client.client_id}. {user?.name}
      </h4>
      <p className="clientemail">{user?.email} </p>

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
