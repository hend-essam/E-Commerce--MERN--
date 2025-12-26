"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Login from "./page";
import Menu from "./components/Menu";
import { ToastContainer } from "react-toastify";

const defaultBackend =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-backend-mu-cyan.vercel.app"
    : "http://localhost:4000";

export const backendUrl = "https://e-commerce-backend-mu-cyan.vercel.app";

const AuthWrapper = ({ children }) => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    if (token && pathname === "/") {
      router.replace("/pages/add");
    }
  }, [token, pathname, router]);

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
