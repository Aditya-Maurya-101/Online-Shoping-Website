import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../assets/images";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://online-shoping-website.onrender.com";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        setIsSubmitting(false);
        return;
      }

      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
      };

      localStorage.setItem(
        "onlineShoppingUser",
        JSON.stringify(user)
      );

      localStorage.setItem("token", data.token);

      navigate("/profile");
    } catch (error) {
      alert("Server error");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#131921] to-[#232f3e] text-white p-10 flex-col justify-center">
          <Link to="/">
            <img
              src={logoLight}
              alt="logo"
              className="w-28 mb-8"
            />
          </Link>

          <h1 className="text-5xl font-bold leading-tight mb-4">
            Welcome back to your{" "}
            <span className="text-yellow-400">
              shopping world
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-8">
            Sign in and continue your orders, save cart,
            and enjoy faster checkout.
          </p>

          <div className="space-y-5">
            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Saved orders access</p>
            </div>

            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Special offers for members</p>
            </div>

            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Track shipments instantly</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-4xl font-bold mb-2">
              Sign in
            </h2>

            <p className="text-gray-500 mb-8">
              Enter email and password.
            </p>

            {/* FORM */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
              />

              <div className="relative">
                <input
                  type={
                    showPass ? "text" : "password"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
                />

                <span
                  onClick={() =>
                    setShowPass(!showPass)
                  }
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                >
                  {showPass ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </span>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="-mt-2 text-left">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 rounded-xl font-bold text-lg transition ${
                  isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#febd69] hover:bg-[#f3a847]"
                }`}
              >
                {isSubmitting
                  ? "Signing in..."
                  : "Sign in"}
              </button>
            </form>

            {/* SOCIAL */}
            <div className="my-7 flex items-center gap-3">
              <div className="h-[1px] bg-gray-300 flex-1"></div>

              <span className="text-sm text-gray-500">
                OR SIGN IN WITH
              </span>

              <div className="h-[1px] bg-gray-300 flex-1"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="h-12 border rounded-xl flex justify-center items-center hover:bg-gray-100">
                <FaGoogle className="text-red-500 text-xl" />
              </button>

              <button className="h-12 border rounded-xl flex justify-center items-center hover:bg-gray-100">
                <FaFacebookF className="text-blue-600 text-xl" />
              </button>

              <button className="h-12 border rounded-xl flex justify-center items-center hover:bg-gray-100">
                <FaApple className="text-black text-xl" />
              </button>
            </div>

            <p className="text-center text-sm mt-8">
              Don’t have account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;