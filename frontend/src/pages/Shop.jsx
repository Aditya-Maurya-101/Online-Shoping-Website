import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pagination from "../components/pageProps/shopPage/Pagination";
import ProductBanner from "../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../components/pageProps/shopPage/ShopSideNav";
import { animateOnScroll, setupHoverAnimation } from "../utils/gsapAnimations";

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState("");

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const shopCategories = [
    "Mobile & Tablets",
    "Accessories",
    "Bags",
    "Furniture",
    "Tables",
    "Sunglasses",
    "Electronics",
    "Men,s Clothing",
    "Women's Clothing",
    "Shoes",
    "Books",
    "Sports & Outdoors",
  ];

  useEffect(() => {
    // Animate page title
    gsap.fromTo(
      ".shop-title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate category buttons
    gsap.fromTo(
      ".category-btn",
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      }
    );

    // Animate sidebar
    animateOnScroll(".shop-sidebar", {
      from: { opacity: 0, x: -50 },
    });

    // Setup hover on buttons
    setupHoverAnimation(".category-btn", { scale: 1.05 });
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-10 text-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-container mx-auto px-4">
          <div className="shop-title">
            <p className="text-lg sm:text-xl uppercase tracking-[0.3em] text-gray-500 mb-4">
              ✨ Discover Amazing Products
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              {selectedCategory || "All Products"}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Browse through thousands of premium products handpicked for quality and value
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-container mx-auto ">
      

        {/* Header Section with Category Filter */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-12 mb-8">
      
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="self-start sm:self-auto px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                ✕ Clear Filter
              </button>
            )}
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 lg:gap-3">
            <button
              onClick={() => setSelectedCategory("")}
              className={`category-btn px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                !selectedCategory
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🎯 All Products
            </button>
            {shopCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* ================= Products Start here =================== */}
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="shop-sidebar w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
            <Pagination itemsPerPage={itemsPerPage} selectedCategory={selectedCategory} />
          </div>
        </div>
        {/* ================= Products End here ===================== */}
      </div>


    </div>
  );
};

export default Shop;

