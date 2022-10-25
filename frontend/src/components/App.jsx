/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";

import "../App.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import LoginPage from "./Login.jsx";
import NotFoundPage from "./Not_FoundPage.jsx";
import SingUpPage from "./SignUp.jsx";
import Navbar from "./HeaderNavbar.jsx";
import routes from "../routes.js";
import AuthContext from "../contexts/index.jsx";
import useAuth from "../hooks/index.jsx";
import Chat from "./Chat/Chat.jsx";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);

  const logIn = () => setLoggedIn(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const logOut = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path={routes.signupPagePath()} element={<SingUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            )}
          />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
