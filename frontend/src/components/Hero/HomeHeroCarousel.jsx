import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

const HomeHeroCarousel = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,

    beforeChange: (_, next) => {
      setDotActive(next);
    },

    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          width: "100%",
        }}
      >
        <ul className="flex justify-center items-center gap-2 m-0 p-0">
          {dots}
        </ul>
      </div>
    ),

    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "24px",
                height: "8px",
                borderRadius: "20px",
                background: "#111827",
                transition: "0.3s",
              }
            : {
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#d1d5db",
                transition: "0.3s",
              }
        }
      />
    ),
  };

  return (
    <div className="w-full bg-white mt-0 px-3 sm:px-4">
      {/* Searchbar ke niche clean spacing */}
      <div className="rounded-lg overflow-hidden shadow-sm bg-white border border-gray-100">
        <Slider {...settings}>
          {/* Slide 1 */}
          <Link to="/offer">
            <div className="w-full h-[26vh] sm:h-[42vh] md:h-[60vh] flex items-center justify-center">
              <Image
                imgSrc={bannerImgOne}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Slide 2 */}
          <Link to="/offer">
            <div className="w-full h-[26vh] sm:h-[42vh] md:h-[60vh] flex items-center justify-center">
              <Image
                imgSrc={bannerImgTwo}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Slide 3 */}
          <Link to="/offer">
            <div className="w-full h-[26vh] sm:h-[42vh] md:h-[60vh] flex items-center justify-center">
              <Image
                imgSrc={bannerImgThree}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </Slider>
      </div>
    </div>
  );
};

export default HomeHeroCarousel;