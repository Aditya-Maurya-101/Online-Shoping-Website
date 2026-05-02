import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEnvelope,
  FaMobileAlt,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../assets/images";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] =
    useState(false);

  /* SEND OTP */
  const sendOtpHandler = () => {
    if (!inputValue) {
      alert("Enter email or mobile number");
      return;
    }

    const randomOtp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();

    setGeneratedOtp(randomOtp);

    alert("Demo OTP: " + randomOtp);

    setStep(2);
  };

  /* VERIFY OTP */
  const verifyOtpHandler = () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    if (otp !== generatedOtp) {
      alert("Invalid OTP");
      return;
    }

    alert("OTP Verified Successfully");
    setStep(3);
  };

  /* RESET PASSWORD */
  const resetPasswordHandler = () => {
    if (!newPassword || !confirmPassword) {
      alert("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password changed successfully");

    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex bg-gradient-to-br from-[#131921] to-[#232f3e] text-white p-10 flex-col justify-center">
          <Link to="/">
            <img
              src={logoLight}
              alt="logo"
              className="w-28 mb-8"
            />
          </Link>

          <h1 className="text-5xl font-bold leading-tight mb-4">
            Recover your{" "}
            <span className="text-yellow-400">
              account access
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-8">
            Verify your identity and create a new
            secure password.
          </p>

          <div className="space-y-5">
            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Email / Mobile OTP verification</p>
            </div>

            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Fast secure password recovery</p>
            </div>

            <div className="flex gap-3">
              <FaCheckCircle className="text-green-400 mt-1 text-xl" />
              <p>Continue shopping instantly</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-6 md:p-10 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <Link
              to="/signin"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-5"
            >
              <FaArrowLeft />
              Back to Sign In
            </Link>

            <h2 className="text-4xl font-bold mb-2">
              Forgot Password
            </h2>

            <p className="text-gray-500 mb-8">
              Recover your account in simple steps.
            </p>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your email or mobile number"
                    value={inputValue}
                    onChange={(e) =>
                      setInputValue(e.target.value)
                    }
                    className="w-full h-12 border rounded-xl px-4 pr-10 outline-none focus:border-black"
                  />

                  <span className="absolute right-4 top-4 text-gray-500">
                    {inputValue.includes("@") ? (
                      <FaEnvelope />
                    ) : (
                      <FaMobileAlt />
                    )}
                  </span>
                </div>

                <button
                  onClick={sendOtpHandler}
                  className="w-full h-12 bg-[#febd69] hover:bg-[#f3a847] rounded-xl font-bold"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                    className="w-full h-12 border rounded-xl px-4 pr-10 outline-none focus:border-black"
                  />

                  <FaShieldAlt className="absolute right-4 top-4 text-gray-500" />
                </div>

                <button
                  onClick={verifyOtpHandler}
                  className="w-full h-12 bg-[#febd69] hover:bg-[#f3a847] rounded-xl font-bold"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="relative">
                  <input
                    type={
                      showPass ? "text" : "password"
                    }
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(
                        e.target.value
                      )
                    }
                    className="w-full h-12 border rounded-xl px-4 pr-10 outline-none focus:border-black"
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

                <div className="relative">
                  <input
                    type={
                      showConfirmPass
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    className="w-full h-12 border rounded-xl px-4 pr-10 outline-none focus:border-black"
                  />

                  <span
                    onClick={() =>
                      setShowConfirmPass(
                        !showConfirmPass
                      )
                    }
                    className="absolute right-4 top-4 cursor-pointer text-gray-500"
                  >
                    {showConfirmPass ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </span>
                </div>

                <button
                  onClick={resetPasswordHandler}
                  className="w-full h-12 bg-[#febd69] hover:bg-[#f3a847] rounded-xl font-bold"
                >
                  Change Password
                </button>
              </div>
            )}

            {/* Progress */}
            <div className="flex justify-center gap-3 mt-10">
              <div
                className={`h-2 w-16 rounded-full ${
                  step >= 1
                    ? "bg-[#febd69]"
                    : "bg-gray-300"
                }`}
              ></div>

              <div
                className={`h-2 w-16 rounded-full ${
                  step >= 2
                    ? "bg-[#febd69]"
                    : "bg-gray-300"
                }`}
              ></div>

              <div
                className={`h-2 w-16 rounded-full ${
                  step >= 3
                    ? "bg-[#febd69]"
                    : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;