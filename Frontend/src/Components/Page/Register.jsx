import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { RegisterAction } from "../../Action/UserAction";
import Swal from "sweetalert2";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Name, SetNamme] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Mobile, SetMobile] = useState("");

  const HandelSave = async () => {
    if (!Name || !Email || !Mobile || !Password) {
      return Swal.fire({
        title: "Warning",
        text: "All fields are required",
        icon: "warning",
      });
    }

    const body = {
      name: Name,
      email: Email,
      mobile: Mobile,
      password: Password,
    };

    try {
      await dispatch(RegisterAction(body));

      Swal.fire({
        title: "Success",
        text: "User Registered Successfully",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      navigate("/Login");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Register Here
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Enter Your Name"
            value={Name}
            onChange={(e) => SetNamme(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Enter Your Email"
            value={Email}
            type="email"
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Enter Your Mobile No"
            value={Mobile}
            maxLength="10"
            onChange={(e) => SetMobile(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Enter Your Password"
            type="password"
            value={Password}
            onChange={(e) => SetPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            onClick={HandelSave}
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/Login"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
