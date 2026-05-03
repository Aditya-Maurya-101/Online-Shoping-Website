import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OfferCardsSlider from "../components/Hero/OfferCardsSlider";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";
import Sale from "../components/home/Sale";
import SpecialOffers from "../components/home/SpecialOffers";
import YearProduct from "../components/home/YearProduct";
import CategorySection from "../components/home/CategorySection";
import { animateOnScroll, setupHoverAnimation } from "../utils/gsapAnimations";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Animate section headings on scroll
    gsap.utils.toArray(".section-heading").forEach((element) => {
      animateOnScroll(element);
    });

    // Animate category cards
    animateOnScroll(".category-card", {
      from: { opacity: 0, y: 50 },
      scrollTrigger: { start: "top 80%" },
    });

    // Setup hover animations for cards
    setupHoverAnimation(".hover-scale-card");

    // Scroll smooth animations
    const sections = document.querySelectorAll(".fade-section");
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            scrub: false,
          },
        }
      );
    });
  }, []);

  return (
    <div className="w-full mx-auto bg-white overflow-x-hidden">
      {/* Landing Hero */}
<section className="relative overflow-hidden bg-white py-20 lg:py-28">
  {/* Background Effects */}
   <div className="hidden md:block absolute top-0 left-0 w-52 h-52 md:w-72 md:h-72 bg-primeColor/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="hidden md:block absolute bottom-0 right-0 w-56 h-56 md:w-80 md:h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>

  <div className="max-w-container mx-auto px-4 sm:px-6">
    <div className="grid lg:grid-cols-2 gap-10 items-center">

      {/* Left Content */}
      <div
        data-aos="fade-right"
        data-aos-duration="1400"
        className="space-y-7 w-full px-2 sm:px-0"
      >
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primeColor font-semibold"
        >
          New Arrival Collection
        </p>

        <h1
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 leading-snug sm:leading-tight md:leading-tight break-words w-full overflow-hidden"
        >
          <span className="block sm:inline animate-bounce">
            Discover
          </span>{" "}
          <span className="block sm:inline text-primeColor typing-text break-words">
            Premium Shopping
          </span>{" "}
           <span className="block sm:inline">Experience</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="500"
          className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-5 sm:leading-6 lg:leading-8 w-full break-words overflow-hidden"
        >
          Explore latest fashion, electronics, beauty products and daily essentials.
          Best quality, lowest price and fast delivery at your doorstep.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="3500"
           data-aos-duration="800"
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primeColor text-white font-semibold hover:bg-black duration-300 shadow-xl hover:scale-105 text-sm sm:text-base transition-all"
          >
            Shop Now
          </Link>

          <Link
            to="/shop"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-primeColor text-primeColor font-semibold hover:bg-primeColor hover:text-white duration-300 hover:scale-105 text-sm sm:text-base transition-all"
          >
            View Collection
          </Link>
        </div>
      </div>

      {/* Right Side Visual */}
      <div
        data-aos="zoom-in-left"
        data-aos-duration="1200"
        data-aos-delay="4200"
        className="relative flex justify-center items-center mt-10 lg:mt-0"
      >
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"
          alt="shopping"
          loading="lazy"
          decoding="async"
          className="rounded-[2rem] shadow-2xl w-full max-w-full sm:max-w-lg object-cover hover:scale-105 duration-500"
        />

        {/* Floating Discount Card */}
        <div
          data-aos="fade-down"
          data-aos-delay="5200"
          className="hidden sm:block absolute top-8 -left-6 bg-white shadow-xl rounded-2xl px-5 py-4 animate-bounce"
        >
          <p className="text-sm text-gray-500">Special Offer</p>
          <h3 className="text-2xl font-bold text-primeColor">50% OFF</h3>
        </div>

        {/* Floating Delivery Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="5400"
          className="hidden sm:block absolute bottom-8 -right-6 bg-white shadow-xl rounded-2xl px-5 py-4 animate-bounce"
        >
          <p className="text-sm text-gray-500">Fast Delivery</p>
          <h3 className="text-xl font-bold text-gray-900">24 Hours</h3>
        </div>
      </div>

    </div>
  </div>

  {/* Extra CSS */}
  <style>
    {`
      .typing-text {
        display: inline-block;
        overflow: hidden;
        word-break: break-word;
        border-right: 3px solid #000;
        animation: typing-mobile 3.2s steps(16,end) forwards, blink .8s infinite;
      }

      @media screen and (min-width: 640px) {
        .typing-text {
          white-space: nowrap;
          border-right: 3px solid #000;
          width: 0;
          animation: typing 3.2s steps(18,end) forwards, blink .8s infinite;
        }
      }

      @keyframes typing-mobile {
        0% { 
          max-width: 0;
          opacity: 1;
        }
        100% { 
          max-width: 100%;
          opacity: 1;
        }
      }

      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }

      @keyframes blink {
        50% { border-color: transparent; }
      }
    `}
  </style>
</section>

      {/* Offer Cards Slider */}
{/* Offer Cards Slider */}
<section className="fade-section pt-0 pb-10 sm:pb-12 bg-white -mt-2">
  <OfferCardsSlider />
</section>

{/* Middle Promo Text Section */}
<section className="bg-white py-8 sm:py-10">
  <div className="max-w-container mx-auto px-4 text-center">
    
    <p className="text-sm uppercase tracking-[0.4em] text-primeColor font-semibold mb-3">
      Limited Time Offer
    </p>

    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
      Discover Amazing Deals For Every Lifestyle
    </h2>

    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-8">
      Shop premium fashion, trending gadgets, home essentials and daily must-haves 
      with unbeatable prices, secure checkout and fast delivery.
    </p>

  </div>
</section>

{/* Main Content */}
<div className="bg-white">

  {/* Sale Section */}
  <section className="fade-section pt-6 pb-16 sm:pt-8 sm:pb-24 bg-slate-50">
    <Sale />
  </section>


        {/* New Arrivals Section */}
        <section className="fade-section py-16 sm:py-24 bg-white">
          <div className="max-w-container mx-auto px-4">
            <div className="section-heading mb-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                ✨ New Arrivals
              </h2>
              <p className="text-lg text-gray-600">
                Discover the latest products added to our collection
              </p>
            </div>
            <NewArrivals />
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="fade-section py-16 sm:py-24 bg-slate-50">
          <div className="max-w-container mx-auto px-4">
            <div className="section-heading mb-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                🔥 Best Sellers
              </h2>
              <p className="text-lg text-gray-600">
                Customer favorites that top the charts
              </p>
            </div>
            <BestSellers />
          </div>
        </section>

        {/* Year Product */}
        <section className="fade-section py-16 sm:py-24 bg-white">
          <div className="max-w-container mx-auto px-4">
            <div className="section-heading mb-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                ⭐ Product of the Year
              </h2>
              <p className="text-lg text-gray-600">
                The most loved product this season
              </p>
            </div>
            <YearProduct />
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="fade-section py-16 sm:py-24 bg-blue-50">
          <div className="max-w-container mx-auto px-4">
            <div className="section-heading mb-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                🎁 Special Offers
              </h2>
              <p className="text-lg text-gray-600">
                Limited time deals you don't want to miss
              </p>
            </div>
            <SpecialOffers />
          </div>
        </section>

        {/* Categories Section */}
        <section className="fade-section py-16 sm:py-24 bg-gray-50">
          <div className="max-w-container mx-auto px-4">
            <div className="section-heading mb-16 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                🛒 Shop by Category
              </h2>
              <p className="text-lg text-gray-600">
                Browse our extensive collection of products
              </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CategorySection
                category="Mobile & Tablets"
                title="📱 Latest Mobile & Tablets"
                subtitle="Discover the newest smartphones, tablets, and accessories"
              />
              <CategorySection
                category="Computers & Laptops"
                title="💻 Computers & Laptops"
                subtitle="Find the perfect laptop or desktop for work and play"
              />
              <CategorySection
                category="Electronics"
                title="⚡ Electronics"
                subtitle="Latest gadgets and electronic devices"
              />
              <CategorySection
                category="Men's Clothing"
                title="👔 Men's Fashion"
                subtitle="Stylish clothing and accessories for men"
              />
              <CategorySection
                category="Women's Clothing"
                title="👗 Women's Fashion"
                subtitle="Trendy clothing and accessories for women"
              />
              <CategorySection
                category="Shoes"
                title="👟 Footwear Collection"
                subtitle="Comfortable and stylish shoes for everyone"
              />
              <CategorySection
                category="Books"
                title="📚 Books & Literature"
                subtitle="Expand your knowledge with our book collection"
              />
              <CategorySection
                category="Sports & Outdoors"
                title="⛰️ Sports & Outdoors"
                subtitle="Gear up for your active lifestyle"
              />
              <CategorySection
                category="Beauty & Personal Care"
                title="💄 Beauty & Personal Care"
                subtitle="Pamper yourself with premium beauty products"
              />
              <CategorySection
                category="Health & Household"
                title="🏥 Health & Household"
                subtitle="Essential items for your home and health"
              />
              <CategorySection
                category="Automotive"
                title="🚗 Automotive"
                subtitle="Keep your vehicle running smoothly"
              />
              <CategorySection
                category="Jewelry & Watches"
                title="⌚ Jewelry & Watches"
                subtitle="Timeless pieces to complement your style"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};


export default Home;

