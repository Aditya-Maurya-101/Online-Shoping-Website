import React from "react";
import Slider from "react-slick";
import Heading from "./Heading";
import Product from "./Product";
import { paginationItems } from "../../constants";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const CategorySection = ({ category, title, subtitle }) => {
  const categoryProducts = paginationItems.filter(item => item.category === category);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  if (categoryProducts.length === 0) return null;

  return (
    <div className="w-full pb-16">
      <Heading heading={title} />
      {subtitle && (
        <p className="text-sm text-gray-600 mb-4 text-center">{subtitle}</p>
      )}
      <Slider {...settings}>
        {categoryProducts.map((item) => (
          <div key={item._id} className="px-2 category-card hover-scale-card">
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySection;