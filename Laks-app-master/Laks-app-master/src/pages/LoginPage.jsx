import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// LoginPage.js
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const send = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:8888/appCrud/login`, {
      email,
      password,
    });
    console.log(res);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } else {
      alert("wrong credentials");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefae0]">
      <div className="w-full max-w-md p-6 rounded-3xl shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <button
            onClick={send}
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
