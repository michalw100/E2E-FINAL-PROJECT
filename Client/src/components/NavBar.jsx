import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { CgProfile } from "react-icons/cg";
import "../css/navBar.css";

function Navbar() {
  const { user } = useContext(AuthContext);
    // console.log(user.role);

  const preventLink = (e) => {
    e.preventDefault();
  };

  const clearClientID = async () => {
    try {
      const response = await fetch("http://localhost:3000/clearClientID", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      // console.log("ClientID cleared from session successfully");
    } catch (error) {
      console.error("Error clearing ClientID from session:", error.message);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("selectedTypeFile");
  };

  return (
    <nav>
      <a href="#" onClick={preventLink}>
        <CgProfile /> Hello {user.name} - {user.role}
      </a>      
      <Link to="./updates" >Updates</Link>
      {user.role!="Client" && (<Link to="./addUser">Add User</Link>)}
      {user.role!="Client" && (<Link to="./myClients">My Clients</Link>)}
      {user.role=="Admin" && (<Link to="./adminDashboard">Admin Dashboard</Link>)}
      <Link to="./userDetails" onClick={clearClientID}>My Details</Link>
      <Link
        to="./myFiles"
        className={!user ? "disabled" : ""}
        onClick={() => {
          clearClientID();
          clearLocalStorage();
        }}
      >My Files</Link>
      <Link to="./logout" className={!user ? "disabled" : ""}>Logout</Link>
      <img 
        id="logo"
        src="../../src/pictures/RoundLogo-removebg-preview.png"
        alt="logo"
      />
    </nav>
  );
}

export default Navbar;
