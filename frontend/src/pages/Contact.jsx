import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";
import Breadcrumbs from "../components/pageProps/Breadcrumbs";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errMessages, setErrMessages] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handleMessages = (e) => {
    setMessages(e.target.value);
    setErrMessages("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handlePost = (e) => {
    e.preventDefault();

    if (!clientName) setErrClientName("Enter your name");
    if (!email) {
      setErrEmail("Enter your email");
    } else if (!EmailValidation(email)) {
      setErrEmail("Enter valid email");
    }

    if (!messages) setErrMessages("Enter your message");

    if (clientName && email && EmailValidation(email) && messages) {
      setSuccessMsg(
        `Thank you ${clientName}! Your message has been received successfully. Our support team will contact you soon on ${email}.`
      );

      setclientName("");
      setEmail("");
      setMessages("");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Contact" prevLocation={prevLocation} />

      {/* Top Heading */}
      <div className="text-center py-10">
        <p className="text-primeColor font-semibold uppercase tracking-widest mb-2">
          Contact Us
        </p>

        <h1 className="text-4xl font-bold text-black mb-4">
          We’d Love To Hear From You
        </h1>

        <p className="max-w-2xl mx-auto text-lightText leading-7">
          Need help with orders, returns, shipping, payments or product details?
          Our customer support team is always ready to assist you quickly.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 pb-20">
        {/* Left Side Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#F5F5F3] rounded-2xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primeColor shadow">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="font-semibold">Phone Number</h4>
                <p className="text-lightText">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primeColor shadow">
                <FaEnvelope />
              </div>
              <div>
                <h4 className="font-semibold">Email Address</h4>
                <p className="text-lightText">support@onlineshop.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primeColor shadow">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4 className="font-semibold">Office Address</h4>
                <p className="text-lightText">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primeColor shadow">
                <FaClock />
              </div>
              <div>
                <h4 className="font-semibold">Working Hours</h4>
                <p className="text-lightText">
                  Mon - Sat : 9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Extra Support Box */}
          <div className="mt-8 bg-white rounded-xl p-5 shadow">
            <div className="flex gap-4 items-center">
              <FaHeadset className="text-3xl text-primeColor" />
              <div>
                <h4 className="font-semibold">24/7 Live Support</h4>
                <p className="text-sm text-lightText">
                  Quick help for orders & refunds
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6">Send Message</h2>

          {successMsg ? (
            <div className="bg-green-100 text-green-700 p-5 rounded-xl font-medium leading-7">
              {successMsg}
            </div>
          ) : (
            <form className="space-y-5">
              <div>
                <input
                  onChange={handleName}
                  value={clientName}
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full h-12 px-4 border rounded-md outline-none focus:border-primeColor"
                />
                {errClientName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errClientName}
                  </p>
                )}
              </div>

              <div>
                <input
                  onChange={handleEmail}
                  value={email}
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full h-12 px-4 border rounded-md outline-none focus:border-primeColor"
                />
                {errEmail && (
                  <p className="text-red-500 text-sm mt-1">{errEmail}</p>
                )}
              </div>

              <div>
                <textarea
                  onChange={handleMessages}
                  value={messages}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-4 border rounded-md outline-none resize-none focus:border-primeColor"
                ></textarea>
                {errMessages && (
                  <p className="text-red-500 text-sm mt-1">
                    {errMessages}
                  </p>
                )}
              </div>

              <button
                onClick={handlePost}
                className="w-full h-12 bg-primeColor text-white rounded-md hover:bg-black duration-300 font-semibold"
              >
                Submit Message
              </button>
            </form>
          )}

          {/* WhatsApp Help */}
          <div className="mt-6 flex items-center gap-3 text-green-600 font-medium">
            <FaWhatsapp className="text-2xl" />
            Instant Chat Support Available
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;