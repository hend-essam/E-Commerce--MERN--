"use client";
import React from "react";
import { useState, useEffect } from "react";
import Login from "./page";
import Menu from "./components/Menu";
import { ToastContainer } from "react-toastify";

export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const AuthWrapper = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  return token === "" ? (
    <Login setToken={setToken} />
  ) : (
    <div className="flex">
      <Menu setToken={setToken} />
      <div className="p-10 w-full">
        <ToastContainer /> {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
