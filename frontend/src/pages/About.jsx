import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaUndoAlt,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import Breadcrumbs from "../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      desc: "Quick and safe delivery across India with trusted courier partners.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payment",
      desc: "100% secure online payments with trusted gateways and encryption.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Dedicated customer support team always ready to help you.",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      desc: "Simple replacement and return policy for stress-free shopping.",
    },
    {
      icon: <FaAward />,
      title: "Premium Quality",
      desc: "We provide only top-rated and verified quality products.",
    },
    {
      icon: <FaUsers />,
      title: "Trusted by Customers",
      desc: "Thousands of happy customers trust our service every day.",
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />

      {/* Hero Section */}
      <div className="py-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm uppercase tracking-widest text-primeColor font-semibold mb-3">
            Welcome To Online Shopping
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-5">
            India’s Trusted Online Shopping Destination
          </h1>

          <p className="text-lightText text-base leading-7 mb-6">
            <span className="text-primeColor font-semibold">
              Online Shopping
            </span>{" "}
            is one of the leading ecommerce brands offering fashion,
            electronics, home essentials, beauty products and lifestyle items.
            We focus on premium quality, fast delivery and customer happiness.
          </p>

          <p className="text-lightText text-base leading-7 mb-8">
            Our mission is to make shopping simple, affordable and enjoyable for
            everyone with exclusive deals, secure payments and reliable service.
          </p>

          <Link to="/shop">
            <button className="w-56 h-12 bg-primeColor text-white hover:bg-black duration-300 rounded-md font-medium">
              Continue Shopping
            </button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#F5F5F3] rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-black">
            Why Choose Us?
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between border-b pb-3">
              <span className="text-lightText">Happy Customers</span>
              <span className="font-semibold text-primeColor">50K+</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-lightText">Products Available</span>
              <span className="font-semibold text-primeColor">100K+</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-lightText">Cities Delivered</span>
              <span className="font-semibold text-primeColor">500+</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lightText">Support Availability</span>
              <span className="font-semibold text-primeColor">24/7</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="pb-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Best Services
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl duration-300"
            >
              <div className="text-3xl text-primeColor mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-lightText leading-6 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;