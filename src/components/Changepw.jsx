import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { saveNewPwd } from "./common/service/apiService/allApi";

const Changepw = () => {
  const st = "border border-gray-500 rounded-md w-72 h-10 p-4 ";
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigation = useNavigate();
  const saveNewPassword = async (e) => {
    e.preventDefault();
    const pwc = { userName, currentPassword, newPassword };
    if (
      userName !== "" &&
      currentPassword !== "" &&
      newPassword !== "" &&
      newPassword2 !== ""
    ) {
      if (newPassword !== newPassword2) {
        Swal.fire({
          title: "Password mismatch",
          icon: "error",
        }).then(() => {
          setNewPassword1("");
          setNewPassword2("");
        });
      } else {
        try {
          const response = await saveNewPwd(pwc);
          if (response.data.responseCode === "10") {
            Swal.fire({ title: "Error", text: "Inavlid User", icon: "error" });
          } else if (response.data.responseCode === "00") {
            Swal.fire({
              title: "Success",
              text: "Password Changed",
              icon: "success",
            }).then(() => {
              navigation("/");
            });
          }
          if (response && response.responseMessage) {
            // Assuming response contains a 'responseMessage' property
            console.log("Response Message:", response.responseMessage);
          } else {
            console.warn(
              "Response does not contain a responseMessage property."
            );
          }
        } catch (error) {
          console.error("Error changing password:", error);
        }
      }
    } else {
      Swal.fire({ title: "empty colomns", icon: "error" });
    }
  };

  return (
    <div className="container flex justify-center items-center h-screen">
      <div className="flex justify-center bg-white w-fit h-fit rounded-xl p-10 border border-blue-200 shadow-sm shadow-blue-300">
        <form className=" space-y-4">
          <div className="flex justify-center text-3xl font-bold mb-12">
            Change Password
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Username</label>
            <input
              type="text"
              className={st}
              placeholder="Type your username..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Current Password</label>
            <input
              type="password"
              className={st}
              placeholder="Type your password..."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">New Password</label>
            <input
              type="password"
              className={st}
              placeholder="Type your password..."
              value={newPassword}
              onChange={(e) => setNewPassword1(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl mb-1">Re-enter New Password</label>
            <input
              type="password"
              className={st}
              placeholder="Type your password..."
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required={true}
            />
          </div>

          <div className="flex flex-crow justify-center items-center gap-x-3 pb-8">
            <Link to="/" className="hover:no-underline">
              <button className="flex flex-1 bg-red-800 w-32 h-full border rounded-md p-3 text-center mt-4 hover:bg-red-600 no-underline text-decoration-line: none;">
                <span className="mx-auto text-xl text-white">Cancel</span>
              </button>
            </Link>
            <button className="flex flex-1 bg-blue-800 w-full h-full border rounded-md p-3 text-center mt-4 hover:bg-blue-600">
              <span
                className="mx-auto text-xl text-white"
                onClick={saveNewPassword}
              >
                Save
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Changepw;
