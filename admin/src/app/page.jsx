"use client";
import axios from "axios";
import Logo from "@/app/components/Logo";
import { useState } from "react";
import { backendUrl } from "@/app/AuthWrapper";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });
      console.log(res);
      if (res.data.success) {
        setToken(res.data.token);
        router.push("/pages/add");
      } else toast.error(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-3">
      <ToastContainer />
      <div className="flex items-center gap-1">
        <Logo hideWord />
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-evenly gap-5 shadow-md rounded-lg px-7 h-[300px] w-[250px]"
        style={{
          boxShadow: "0 0 20px 10px #c7b188",
          border: "1px solid rgb(139 104 76 / 51%)",
        }}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="py-2 px-1 bg-transparent"
            style={{
              borderBottom: "2px solid rgb(139 104 76 / var(--tw-bg-opacity))",
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="py-2 px-1 bg-transparent"
            style={{
              borderBottom: "2px solid rgb(139 104 76 / var(--tw-bg-opacity))",
            }}
          />
        </div>
        <button
          type="submit"
          className="bg-[#8b684c] text-white px-4 py-1.5 rounded-full text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
