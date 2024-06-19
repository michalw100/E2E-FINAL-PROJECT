import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import SignIn from "./pages/SignIn.jsx";
import Updates from "./pages/UpdatesPage.jsx";
import SignUp from "./pages/SignUp.jsx";
import Logout from "./pages/Logout.jsx";
import Files from "./pages/Files.jsx";
import MyClients from "./pages/MyClients.jsx";
import { AuthProvider, AuthContext } from "./AuthContext";
import UserDetails from "./pages/UserDetails.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/aboutUs" />;
}

function NestedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("adminDashboard")) {
      document
        .querySelectorAll(".relationship-line")
        .forEach((line) => line.remove());
    }
  }, [location]);

  return (
    <Routes location={location}>
      <Route path="/updates" element={<Updates />} />
      <Route path="/addUser" element={<SignUp />} />
      <Route path="/myClients" element={<MyClients />} />
      <Route path="/myFiles" element={<Files key={location.key} />} />
      <Route path="/myFiles/:id" element={<Files key={location.key} />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/userDetails" element={<UserDetails key={location.key} />} />
      <Route
        path="/userDetails/:id"
        element={<UserDetails key={location.key} />}
      />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <NestedRoutes />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
