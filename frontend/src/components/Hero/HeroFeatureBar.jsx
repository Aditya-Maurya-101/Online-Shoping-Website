import React from "react";
import {
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast className="w-6 h-6" />,
    title: "Fast Delivery",
    subtitle: "Same-day dispatch and fast shipping",
  },
  {
    icon: <FaShieldAlt className="w-6 h-6" />,
    title: "Secure Payments",
    subtitle: "Protected checkout for every order",
  },
  {
    icon: <FaUndoAlt className="w-6 h-6" />,
    title: "Easy Returns",
    subtitle: "Hassle-free returns within 14 days",
  },
  {
    icon: <FaHeadset className="w-6 h-6" />,
    title: "24/7 Support",
    subtitle: "Help is available whenever you need it",
  },
];

const HeroFeatureBar = () => {
  return (
    <div className="w-full bg-[#f7fafc] py-5">
      <div className="max-w-container mx-auto px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primeColor text-white">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#111827]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFeatureBar;
