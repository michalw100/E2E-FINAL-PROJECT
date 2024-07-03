import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [chatClient, setChatClient] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return disconnectClient;
  }, []);

  useEffect(() => {
    if (apiKey) {
      setChatClient(StreamChat.getInstance(apiKey));
    }
  }, [apiKey]);

  useEffect(() => {
    if (user) {
      getApiKey();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.streamToken && apiKey) {
      setupClient();
    }
  }, [user, chatClient]);

  const disconnectClient = async () => {
    if (clientReady) {
      chatClient.disconnectUser();
    }
  };

  const setupClient = async () => {
    const userId = `user-${user.id}`;
    const userToken = user.streamToken;
    await chatClient.connectUser(
      {
        id: userId,
      },
      userToken
    );
    setClientReady(true);
  };

  const getApiKey = async () => {
    try {
      const data = await fetch(`http://localhost:3000/chat/apiKey`, {
        method: "GET",
        credentials: "include",
      });
      if (!data) {
      } else {
        const [apiKey] = await data.json();
        setApiKey(apiKey);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      if (response.ok) {
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
        disconnectClient();
        navigate("/aboutUs");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, logout, signUp, chatClient, clientReady }}
    >
      {user === undefined ? null : children}
    </AuthContext.Provider>
  );
};
