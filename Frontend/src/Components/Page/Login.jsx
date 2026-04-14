import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserLoginAction } from "../../Action/UserAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, user } = useSelector((state) => state?.User);

  console.log("User slice: ", login, user);

  const [Email, SetEmail] = useState("ajay@gmail.com");
  const [Password, SetPassword] = useState("123");

  const HandleLogin = async () => {
    if (!Email || !Password) {
      return Swal.fire({
        title: "Warning",
        text: "All fields are required",
        icon: "warning",
      });
    }

    const body = {
      email: Email,
      password: Password,
    };

    try {
      const response = await dispatch(UserLoginAction(body));

      if (response?.sucess === "true") {
        Swal.fire({
          title: "Success",
          text: response?.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });

        navigate("/Task");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid Credentials",
          icon: "error",
        });
      }
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
          User Detail
        </h2>

        <div className="space-y-4">
          <input
            placeholder="Enter Your Email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
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
            onClick={HandleLogin}
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-500 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/" className="text-blue-600 cursor-pointer hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
