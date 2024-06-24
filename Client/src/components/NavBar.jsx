import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { CgProfile } from "react-icons/cg";
import "../css/navBar.css";

function Navbar({ isUploading }) {
  const { user } = useContext(AuthContext);
  // console.log(user.role);

  const preventLink = (e) => {
    e.preventDefault();
  };

  const clearClientID = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/myClient/clearClientID",
        {
          method: "GET",
          credentials: "include",
        }
      );
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

  const handleLinkClick = (e, func1, func2) => {
    if (isUploading) {
      e.preventDefault(); // מונע את הניגון של הקישור במידה והתנאי לא מתקיים
      window.open(e.target.href, "_blank"); // פותח את הקישור בכרטיסיה חדשה
    } else {
      if (func1) func1();
      if (func2) func2();
    }
  };

  return (
    <nav>
      <a href="#" onClick={preventLink}>
        <CgProfile /> Hello {user.name} - {user.role}
      </a>
      <Link to="./updates" onClick={(e) => handleLinkClick(e)}>
        Updates
      </Link>
      {user.role != "Client" && (
        <Link to="./addUser" onClick={(e) => handleLinkClick(e)}>
          Add User
        </Link>
      )}
      {user.role != "Client" && (
        <Link to="./myClients" onClick={(e) => handleLinkClick(e)}>
          My Clients
        </Link>
      )}
      {user.role == "Admin" && (
        <Link to="./adminDashboard">Admin Dashboard</Link>
      )}
      <Link
        to="./userDetails"
        onClick={(e) => handleLinkClick(e, clearClientID)}
      >
        My Details
      </Link>
      {user.role != "Admin" && (
        <Link
          to="./myFiles"
          className={!user ? "disabled" : ""}
          onClick={(e) => handleLinkClick(e, clearClientID, clearLocalStorage)}
        >
          My Files
        </Link>
      )}
      <Link
        to="./logout"
        onClick={(e) => handleLinkClick(e)}
        className={!user ? "disabled" : ""}
      >
        Logout
      </Link>
      <img
        id="logo"
        src="../../src/pictures/RoundLogo-removebg-preview.png"
        alt="logo"
      />
    </nav>
  );
}

export default Navbar;
