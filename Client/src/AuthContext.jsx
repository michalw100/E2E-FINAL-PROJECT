import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/checkAuth", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const userSession = await response.json();
        const data = await fetch(
          `http://localhost:3000/users/user?id=${userSession.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const user = await data.json();
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signIn = async (userName, password) => {
    try {
      const response = await fetch(`http://localhost:3000/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName, password }),
      });
      const userFromDB = await response.json();
      // console.log(userFromDB)
      if (response.ok) {
        // console.log("userFromDB")
        // console.log(userFromDB)
        setUser(userFromDB);
        navigate("./");
      } else {
        throw new Error(
          userFromDB.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signUp = async (userName, password, employeType, role) => {
    try {
      const response = await fetch(`http://localhost:3000/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userName, password, employeType, role }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("./");
      } else {
        throw new Error(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message || "An error occurred. Please try again.");
      } else {
        setUser(null);
        navigate("/aboutUs");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, logout, signUp }}>
      {user === undefined ? null : children}
    </AuthContext.Provider>
  );
};
