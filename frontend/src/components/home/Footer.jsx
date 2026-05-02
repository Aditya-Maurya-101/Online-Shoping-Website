import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../assets/images";
import Image from "../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const validateEmail = () => {
    return String(emailInfo)
      .toLowerCase()
      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscribe = () => {
    if (emailInfo === "") {
      setErrMsg("Please enter your email");
    } else if (!validateEmail()) {
      setErrMsg("Please enter a valid email");
    } else {
      setSuccess(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <footer className="w-full bg-[#F5F5F3] text-lightText pt-16 pb-8">
      <div className="max-w-container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-bold text-primeColor mb-4">
            Online Shop
          </h2>

          <p className="text-sm leading-6 mb-5">
            Best online shopping store for fashion, electronics, home products
            and lifestyle accessories with premium quality and trusted service.
          </p>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primeColor" />
              Mumbai, Maharashtra
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-primeColor" />
              +91 98765 43210
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-primeColor" />
              support@onlineshop.com
            </p>
          </div>
        </div>

        {/* Shop Category */}
        <div>
          <FooterListTitle title="Shop Categories" />
          <ul className="space-y-3 mt-5 text-sm">
            {[
              "Men Fashion",
              "Women Fashion",
              "Electronics",
              "Home Appliances",
              "Beauty Products",
              "New Arrivals",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-black duration-300 cursor-pointer hover:translate-x-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Links */}
        <div>
          <FooterListTitle title="Customer Service" />
          <ul className="space-y-3 mt-5 text-sm">
            {[
              "My Account",
              "Track Order",
              "Wishlist",
              "Return Policy",
              "Shipping Info",
              "Help Center",
            ].map((item, index) => (
              <li
                key={index}
                className="hover:text-black duration-300 cursor-pointer hover:translate-x-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <FooterListTitle title="Newsletter" />

          <p className="text-sm mt-5 mb-4 leading-6">
            Subscribe now for latest offers, sale updates and discount coupons.
          </p>

          {success ? (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-green-600 font-semibold mb-4"
            >
              Successfully Subscribed!
            </motion.p>
          ) : (
            <>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={emailInfo}
                  onChange={(e) => setEmailInfo(e.target.value)}
                  className="h-12 px-4 bg-white border border-gray-300 rounded-md outline-none focus:border-primeColor"
                />

                <button
                  onClick={handleSubscribe}
                  className="h-12 bg-primeColor text-white rounded-md hover:bg-black hover:text-white duration-300 font-medium"
                >
                  Subscribe Now
                </button>
              </div>

              {errMsg && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  {errMsg}
                </p>
              )}
            </>
          )}

          {/* Social Icons */}
<div className="flex gap-3 mt-6">

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primeColor hover:text-white duration-300"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primeColor hover:text-white duration-300"
  >
    <FaInstagram />
  </a>

  <a
    href="https://youtube.com"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primeColor hover:text-white duration-300"
  >
    <FaYoutube />
  </a>

  <a
    href="https://www.linkedin.com/in/aditya-maurya-75a38b354"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primeColor hover:text-white duration-300"
  >
    <FaLinkedinIn />
  </a>

  <a
    href="https://github.com/Aditya-Maurya-101"
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer hover:bg-primeColor hover:text-white duration-300"
  >
    <FaGithub />
  </a>

</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-12 pt-6 max-w-container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center gap-5">
        <Image className="w-[250px]" imgSrc={paymentCard} />
      </div>
    </footer>
  );
};

export default Footer;