import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaShoppingCart, FaHome } from "react-icons/fa";
import { MdShoppingBag } from "react-icons/md";
import Flex from "../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { paginationItems } from "../../constants";

const HeaderBottom = () => {
  const products = useSelector((state) => state.onlineShoppingReducer.products);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  const isLoggedIn = Boolean(localStorage.getItem("onlineShoppingUser"));

  useEffect(() => {
    const handleBodyClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);
    return () => document.body.removeEventListener("click", handleBodyClick);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const source = paginationItems; // Always use catalog products for search
    const filtered = source.filter((item) =>
      (item.productName && item.productName.toLowerCase().includes(query)) ||
      (item.des && item.des.toLowerCase().includes(query)) ||
      (item.color && item.color.toLowerCase().includes(query))
    );

    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <>
      <div className="w-full bg-[#F5F5F3] relative md:pb-0">
        <div className="max-w-container mx-auto">
          <Flex className="flex flex-col lg:flex-row items-center justify-between w-full px-3 md:px-4 py-3 lg:py-0 h-full lg:h-24 gap-3 lg:gap-0">
            
            {/* Left Section - Category */}
            <div
              onClick={() => setShow(!show)}
              ref={ref}
              className="hidden md:flex h-12 cursor-pointer items-center gap-2 text-primeColor hover:text-black transition"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[14px] font-normal">Shop by Category</p>

              {show && (
                <motion.ul
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-14 z-50 bg-primeColor w-56 text-[#767676] h-auto p-4 pb-6 rounded shadow-lg"
                >
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Accessories
                  </li>
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Furniture
                  </li>
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Electronics
                  </li>
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Clothes
                  </li>
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Bags
                  </li>
                  <li className="text-gray-400 px-4 py-2 border-b-[1px] border-b-gray-400  hover:border-b-white hover:text-white duration-300 cursor-pointer">
                    Home appliances
                  </li>
                </motion.ul>
              )}
            </div>

            {/* Center Section - Search Bar */}
            <div
              className="relative w-full md:w-[500px] lg:w-[600px] h-[45px] md:h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-4 md:px-6 rounded-xl shadow-sm"
            >
              <input
                className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[12px] md:placeholder:text-[14px]"
                type="text"
                onChange={handleSearch}
                value={searchQuery}
                placeholder="Search products here"
              />
              <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
              {searchQuery && (
                <div className="w-full absolute left-0 top-full z-50 mt-2 rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 text-sm font-semibold text-gray-700">
                    Search results for “{searchQuery}”
                  </div>
                  <div className="w-full overflow-y-auto max-h-[55vh] md:max-h-[45vh] scrollbar-hide">
                    {filteredProducts.length ? (
                      filteredProducts.map((item) => (
                        <button
                          type="button"
                          onMouseDown={() => {
                            navigate(
                              `/product/${item.productName
                                .toLowerCase()
                                .split(" ")
                                .join("")}`,
                              {
                                state: {
                                  item: item,
                                },
                              }
                            );
                            setSearchQuery("");
                          }}
                          key={item._id}
                          className="w-full text-left h-24 md:h-28 bg-gray-100 mb-2 flex items-center gap-3 px-3 hover:bg-gray-200 transition"
                        >
                          <img
                            className="w-20 md:w-24 h-20 md:h-24 object-cover rounded-lg"
                            src={item.img}
                            alt={item.productName}
                          />
                          <div className="flex flex-col gap-1 flex-1">
                            <p className="font-semibold text-sm md:text-lg">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {item.des}
                            </p>
                            <p className="text-xs md:text-sm text-gray-700">
                              Price:{" "}
                              <span className="text-primeColor font-semibold">
                                ₹{item.price}
                              </span>
                            </p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="w-full py-8 text-center text-sm text-gray-500">
                        No products found for “{searchQuery}”
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Section - Profile & Cart (Desktop Only) */}
            <div className="hidden md:flex gap-4 md:gap-6 items-center cursor-pointer relative">
              <Link to={isLoggedIn ? "/profile" : "/signin"} className="flex items-center text-primeColor hover:text-black transition text-lg md:text-xl">
                <FaUser className="w-5 h-5" />
              </Link>

              <Link to="/cart" className="relative hover:text-black transition">
                <div className="flex items-center text-primeColor text-lg md:text-xl">
                  <FaShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  {products.length > 0 && (
                    <span className="absolute font-titleFont -top-2 -right-3 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                      {products.length}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </Flex>

          {/* Mobile Category Menu */}
          <div className="md:hidden px-3 pb-2">
            <div
              onClick={() => setShow(!show)}
              ref={ref}
              className="flex h-10 cursor-pointer items-center gap-2 text-primeColor hover:text-black transition text-sm"
            >
              <HiOutlineMenuAlt4 className="w-5 h-5" />
              <p className="text-[12px] font-normal">Shop by Category</p>
            </div>
            {show && (
              <motion.ul
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-primeColor w-full text-[#767676] h-auto p-3 mt-2 rounded shadow-lg"
              >
                <li className="text-gray-300 px-3 py-1 border-b-[1px] border-b-gray-500 hover:border-b-white hover:text-white duration-300 cursor-pointer text-sm">
                  Accessories
                </li>
                <li className="text-gray-300 px-3 py-1 border-b-[1px] border-b-gray-500 hover:border-b-white hover:text-white duration-300 cursor-pointer text-sm">
                  Furniture
                </li>
                <li className="text-gray-300 px-3 py-1 border-b-[1px] border-b-gray-500 hover:border-b-white hover:text-white duration-300 cursor-pointer text-sm">
                  Electronics
                </li>
                <li className="text-gray-300 px-3 py-1 border-b-[1px] border-b-gray-500 hover:border-b-white hover:text-white duration-300 cursor-pointer text-sm">
                  Clothes
                </li>
                <li className="text-gray-300 px-3 py-1 border-b-[1px] border-b-gray-500 hover:border-b-white hover:text-white duration-300 cursor-pointer text-sm">
                  Bags
                </li>
                <li className="text-gray-300 px-3 py-1 hover:text-white duration-300 cursor-pointer text-sm">
                  Home appliances
                </li>
              </motion.ul>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
        <div className="flex justify-around items-center h-20 px-4">
          
          {/* Home */}
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center gap-1 text-primeColor hover:text-black transition w-full h-full"
          >
            <FaHome className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>

          {/* Shopping */}
          <Link 
            to="/shop" 
            className="flex flex-col items-center justify-center gap-1 text-primeColor hover:text-black transition w-full h-full"
          >
            <MdShoppingBag className="w-6 h-6" />
            <span className="text-xs font-semibold">Shop</span>
          </Link>

          {/* Cart */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center justify-center gap-1 text-primeColor hover:text-black transition w-full h-full relative"
          >
            <div className="relative">
              <FaShoppingCart className="w-6 h-6" />
              {products.length > 0 && (
                <span className="absolute font-titleFont -top-2 -right-3 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                  {products.length}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold">Cart</span>
          </Link>

          {/* Profile */}
          <Link 
            to={isLoggedIn ? "/profile" : "/signin"} 
            className="flex flex-col items-center justify-center gap-1 text-primeColor hover:text-black transition w-full h-full"
          >
            <FaUser className="w-6 h-6" />
            <span className="text-xs font-semibold">Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;

