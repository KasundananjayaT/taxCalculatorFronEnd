import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validUser } from "./common/service/apiService/allApi";
import Swal from "sweetalert2";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate("");

  const loginUser = async (e) => {
    //real time
    e.preventDefault();
    try {
      const response = await validUser(userName, password);
      if (response.data.responseCode === "00") {
        sessionStorage.setItem("responseCode", response.data.responseCode);
        nav("/dashboard");
      } else {
        Swal.fire({
          title: "Invalid Username or Password",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };

  const st = "border border-gray-500 rounded-md w-72 h-10 p-4 ";
  const isButtonDisabled = !userName.trim() || !password.trim();

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="flex justify-center bg-white w-fit h-fit rounded-xl p-10 border border-blue-200 shadow-sm shadow-blue-300">
        <form className=" space-y-4">
          <div className="flex justify-center text-3xl font-bold mb-12">
            Login
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Username</label>
            <input
              type="text"
              className={st}
              placeholder="Type your username..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Password</label>
            <input
              type="password"
              className={st}
              placeholder="Type your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              className={`flex flex-1 bg-blue-800 w-full h-8 border rounded-md p-3 text-center mt-4 hover:bg-blue-600 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={(e) => loginUser(e)}
              disabled={isButtonDisabled}
            >
              <span className="mx-auto text-xl text-white">Login</span>
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Link to="/changepassword">
              <span className="mt-5 underline underline-offset-2">
                Change password...
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
