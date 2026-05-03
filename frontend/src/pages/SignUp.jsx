import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import {
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../assets/images";
import API_BASE_URL from "../utils/api";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!checked) {
      alert("Please agree to the terms to continue.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || (data.errors && data.errors[0]?.msg) || "Unable to create account.";
        alert(message);
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

      localStorage.setItem("onlineShoppingUser", JSON.stringify(user));
      localStorage.setItem("token", data.token);

      alert("Account created successfully.");
      navigate("/profile");
    } catch (error) {
      console.error("Signup request failed:", error);
      alert(
        `Server error. Please make sure the backend is running at ${API_BASE_URL} and check the terminal for the exact error.`
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#131921] to-[#232f3e] text-white p-10 flex-col justify-center">
          <Link to="/">
            <img src={logoLight} alt="logo" className="w-28 mb-8" />
          </Link>

          <h1 className="text-5xl font-bold leading-tight mb-4">
            Create your <span className="text-yellow-400">Amazon Style</span>
            <br /> Shopping Account
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-8">
            Join millions of customers enjoying fast delivery, secure checkout,
            wishlists, offers, returns and premium shopping experience.
          </p>

          <div className="space-y-5">
            <div className="flex gap-3">
              <BsCheckCircleFill className="text-green-400 mt-1 text-xl" />
              <p>Fast checkout with saved addresses</p>
            </div>

            <div className="flex gap-3">
              <BsCheckCircleFill className="text-green-400 mt-1 text-xl" />
              <p>Exclusive member-only offers & discounts</p>
            </div>

            <div className="flex gap-3">
              <BsCheckCircleFill className="text-green-400 mt-1 text-xl" />
              <p>Track orders and easy returns anytime</p>
            </div>

            <div className="flex gap-3">
              <BsCheckCircleFill className="text-green-400 mt-1 text-xl" />
              <p>Trusted by millions of online shoppers</p>
            </div>
          </div>

          <div className="flex justify-between mt-12 text-sm text-gray-300">
            <span>© Online Shopping</span>
            <span>Terms</span>
            <span>Privacy</span>
            <span>Security</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-4xl font-bold mb-2">Create account</h2>
            <p className="text-gray-500 mb-8">
              Sign up to start shopping smarter.
            </p>

            <form onSubmit={handleSignup} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Mobile Number"
                onChange={handleChange}
                className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
              />

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Create Password"
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="w-full h-12 border rounded-xl px-4 outline-none focus:border-black"
                />
                <span
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label className="flex items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="mt-1"
                />
                <span>
                  I agree to the{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </label>

              <button
                type="submit"
                disabled={!checked || isSubmitting}
                className={`w-full h-12 rounded-xl font-bold text-lg transition ${
                  !checked || isSubmitting
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#febd69] hover:bg-[#f3a847]"
                }`}
              >
                {isSubmitting ? "Creating account..." : "Create your account"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <div className="h-[1px] bg-gray-300 flex-1"></div>
              <span className="text-sm text-gray-500">OR SIGN UP WITH</span>
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
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
