import React, { useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const items = [
    {
      _id: 990,
      title: "All Products",
      icons: true,
    },
    {
      _id: 991,
      title: "Mobile & Tablets",
    },
    {
      _id: 992,
      title: "Computers & Laptops",
    },
    {
      _id: 993,
      title: "Electronics",
    },
    {
      _id: 994,
      title: "Men's Clothing",
    },
    {
      _id: 995,
      title: "Women's Clothing",
    },
    {
      _id: 996,
      title: "Shoes",
    },
    {
      _id: 997,
      title: "Accessories",
    },
    {
      _id: 998,
      title: "Bags",
    },
    {
      _id: 999,
      title: "Furniture",
    },
    {
      _id: 1000,
      title: "Tables",
    },
    {
      _id: 1001,
      title: "Sunglasses",
    },
    {
      _id: 1002,
      title: "Home & Garden",
    },
    {
      _id: 1003,
      title: "Books",
    },
    {
      _id: 1004,
      title: "Sports & Outdoors",
    },
    {
      _id: 1005,
      title: "Beauty & Personal Care",
    },
    {
      _id: 1006,
      title: "Health & Household",
    },
    {
      _id: 1007,
      title: "Automotive",
    },
    {
      _id: 1008,
      title: "Jewelry & Watches",
    },
    {
      _id: 1009,
      title: "Musical Instruments",
    },
    {
      _id: 1010,
      title: "Pet Supplies",
    },
    {
      _id: 1011,
      title: "Office Products",
    },
    {
      _id: 1012,
      title: "Industrial & Scientific",
    },
    {
      _id: 1013,
      title: "Toys & Games",
    },
    {
      _id: 1014,
      title: "Others",
    },
  ];
  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ _id, title, icons }) => {
            const isActive = title === selectedCategory || (title === "All Products" && !selectedCategory);
            return (
              <li
                key={_id}
                onClick={() => setSelectedCategory(title === "All Products" ? "" : title)}
                className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between cursor-pointer ${
                  isActive ? "text-black font-semibold" : "text-[#767676]"
                }`}
              >
                {title}
                {icons && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSubCatOne(!showSubCatOne);
                    }}
                    className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                  >
                    <ImPlus />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
