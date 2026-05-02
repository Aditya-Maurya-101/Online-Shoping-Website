import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUserAlt,
  FaArrowRight,
  FaTags,
} from "react-icons/fa";
import Breadcrumbs from "../components/pageProps/Breadcrumbs";

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const blogs = [
    {
      title: "Top 10 Shopping Tips To Save More Money Online",
      date: "02 May 2026",
      author: "Admin",
      category: "Shopping Guide",
      desc: "Learn smart shopping tricks to save money during online sales, offers and cashback seasons.",
    },
    {
      title: "Best Electronics Deals This Season",
      date: "28 Apr 2026",
      author: "Admin",
      category: "Electronics",
      desc: "Explore trending gadgets, smartphones and accessories with amazing discounts.",
    },
    {
      title: "Fashion Trends You Should Try This Year",
      date: "20 Apr 2026",
      author: "Admin",
      category: "Fashion",
      desc: "Latest men and women fashion styles that are trending in 2026.",
    },
    {
      title: "How Fast Delivery Improves Customer Experience",
      date: "12 Apr 2026",
      author: "Admin",
      category: "Service",
      desc: "Why quick shipping and reliable delivery matter in ecommerce business.",
    },
    {
      title: "Home Decor Products That Change Your Space",
      date: "06 Apr 2026",
      author: "Admin",
      category: "Home Living",
      desc: "Best affordable home décor items to upgrade your room beautifully.",
    },
    {
      title: "Safe Online Payments: Complete Guide",
      date: "01 Apr 2026",
      author: "Admin",
      category: "Security",
      desc: "Understand secure payment methods and how to shop online safely.",
    },
  ];

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Journals" prevLocation={prevLocation} />

      {/* Hero Section */}
      <div className="text-center py-10">
        <p className="text-primeColor font-semibold uppercase tracking-widest mb-2">
          Latest Updates
        </p>

        <h1 className="text-4xl font-bold text-black mb-4">
          Online Shopping Journal & Blog
        </h1>

        <p className="max-w-2xl mx-auto text-lightText leading-7">
          Discover shopping tips, latest product trends, ecommerce news,
          fashion ideas, electronics guides and exclusive updates from our
          store.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
        {blogs.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl duration-300"
          >
            {/* Top Image Placeholder */}
            <div className="h-52 bg-[#F5F5F3] flex items-center justify-center text-primeColor text-5xl font-bold">
              {index + 1}
            </div>

            <div className="p-6">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs text-lightText mb-4">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {item.date}
                </span>

                <span className="flex items-center gap-2">
                  <FaUserAlt />
                  {item.author}
                </span>

                <span className="flex items-center gap-2">
                  <FaTags />
                  {item.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 leading-7 hover:text-primeColor duration-300 cursor-pointer">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-lightText text-sm leading-6 mb-5">
                {item.desc}
              </p>

              {/* Read More */}
              <button className="flex items-center gap-2 text-primeColor font-semibold hover:text-black duration-300">
                Read More <FaArrowRight />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-[#F5F5F3] rounded-2xl p-10 mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Explore Premium Products Now
        </h2>

        <p className="text-lightText max-w-2xl mx-auto mb-6 leading-7">
          Shop latest fashion, electronics, home essentials and exclusive deals
          with trusted delivery and secure payments.
        </p>

        <Link to="/shop">
          <button className="w-56 h-12 bg-primeColor text-white rounded-md hover:bg-black duration-300 font-semibold">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Journal;