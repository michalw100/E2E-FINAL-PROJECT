import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuFiles } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import chanel from "../helpers/chanels.js";

const Client = ({ client }) => {
  const navigate = useNavigate();

  const saveUserDetailsToServer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/myClient/storeClientID`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientID: client.userID }),
          credentials: "include",
        }
      );

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
    navigate(`/userDetails/${client.userID}`);
  };

  const viewFiles = async () => {
    await saveUserDetailsToServer();
    localStorage.removeItem("selectedTypeFile");
    navigate(`/myFiles/${client.userID}`);
  };

  const viewChat = async () => {
    try {
      console.log("ckient");
      console.log(client);
      await chanel.createChatChannel(
        client.userToken,
        null,
        client.userID,
        client.userName
      );
      navigate("../chats");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={client.id} className="client">
      <h4 id=".clientDetails">
        {client.id}. {client.userName}
      </h4>
      <p className="clientemail">{client.email} </p>

      <button className="mydetails" onClick={viewDetails}>
        <ImProfile />
      </button>
      <button className="mydetails" onClick={viewFiles}>
        <LuFiles />
      </button>
      <button className="mydetails" onClick={viewChat}>
        <FaComments />
      </button>
    </div>
  );
};

export default Client;
