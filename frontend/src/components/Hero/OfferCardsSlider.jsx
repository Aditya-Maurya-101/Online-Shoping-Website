import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import gsap from "gsap";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  newArrOne,
  newArrTwo,
  newArrThree,
} from "../../assets/images";

const OfferCardsSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRef = useRef([]);
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      title: "Electronics",
      subtitle: "Best Deals",
      bg: "#FFE5E5",
      image: bestSellerOne,
      offer: "50% OFF",
      color: "#D32F2F",
    },
    {
      id: 2,
      title: "Fashion",
      subtitle: "New Arrivals",
      bg: "#E5F5FF",
      image: bestSellerTwo,
      offer: "40% OFF",
      color: "#0288D1",
    },
    {
      id: 3,
      title: "Home",
      subtitle: "Premium Items",
      bg: "#FFF3E5",
      image: bestSellerThree,
      offer: "35% OFF",
      color: "#F57C00",
    },
    {
      id: 4,
      title: "Sports",
      subtitle: "Active Wear",
      bg: "#E8F5E9",
      image: bestSellerFour,
      offer: "45% OFF",
      color: "#388E3C",
    },
    {
      id: 5,
      title: "Accessories",
      subtitle: "Limited Time",
      bg: "#F3E5F5",
      image: newArrOne,
      offer: "55% OFF",
      color: "#7B1FA2",
    },
    {
      id: 6,
      title: "Beauty",
      subtitle: "Premium Range",
      bg: "#FCE4EC",
      image: newArrTwo,
      offer: "30% OFF",
      color: "#C2185B",
    },
    {
      id: 7,
      title: "Gadgets",
      subtitle: "Latest Tech",
      bg: "#E0F2F1",
      image: newArrThree,
      offer: "60% OFF",
      color: "#00796B",
    },
  ];

  // Handle card click - navigate to shop
  const handleCardClick = (category) => {
    navigate("/shop", { 
      state: { 
        category: category.toLowerCase() 
      } 
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (_, next) => {
      setActiveIndex(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "15px",
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
          i === activeIndex
            ? {
                width: "28px",
                height: "6px",
                borderRadius: "20px",
                background: cardsData[i]?.color || "#111827",
                transition: "all 0.4s ease",
              }
            : {
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#D1D5DB",
                transition: "all 0.4s ease",
              }
        }
      />
    ),
  };

  // GSAP Animation for text
  useEffect(() => {
    const textElements = textRef.current;
    if (textElements.length > 0) {
      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [activeIndex]);

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white mt-0 px-3 sm:px-4 py-6">
      <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
        <Slider {...settings}>
          {cardsData.map((card, index) => (
            <div 
              key={card.id}
              onClick={() => handleCardClick(card.title)}
              className="cursor-pointer"
            >
              <div
                className="w-full h-[28vh] sm:h-[45vh] md:h-[65vh] relative flex items-center justify-between overflow-hidden transition-transform hover:scale-105"
                style={{ backgroundColor: card.bg }}
              >
                {/* Left Side - Text Content */}
                <div className="relative z-10 w-1/2 px-4 sm:px-6 md:px-10 flex flex-col justify-center h-full">
                  {/* Offer Badge */}
                  <div
                    ref={(el) => (textRef.current[0] = el)}
                    className="inline-block w-fit mb-2 sm:mb-3"
                  >
                    <span
                      className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm font-bold"
                      style={{ backgroundColor: card.color }}
                    >
                      🎉 {card.offer}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    ref={(el) => (textRef.current[1] = el)}
                    className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2"
                  >
                    {card.title}
                  </h2>

                  {/* Subtitle */}
                  <p
                    ref={(el) => (textRef.current[2] = el)}
                    className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4"
                  >
                    {card.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleCardClick(card.title)}
                    ref={(el) => (textRef.current[3] = el)}
                    className="w-fit px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white text-xs sm:text-sm font-semibold transition-all hover:shadow-lg hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: card.color,
                    }}
                  >
                    Shop Now →
                  </button>
                </div>

                {/* Right Side - Image */}
                <div className="absolute right-0 w-1/2 h-full flex items-center justify-center opacity-80 md:opacity-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className="absolute left-0 top-0 h-full w-1/3 pointer-events-none"
                  style={{
                    background: `linear-gradient(to right, ${card.bg}, transparent)`,
                    zIndex: 5,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OfferCardsSlider;
