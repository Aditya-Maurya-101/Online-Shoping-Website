import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <Category
        icons={false}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Color />
      <Brand />
      <Price />
    </div>
  );
};

export default ShopSideNav;
