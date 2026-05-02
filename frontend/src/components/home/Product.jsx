import React, { useState } from "react";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import Image from "../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/onlineShoppingSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const productItem = props;
  const images = props.images || [props.img];

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const handleBuyNow = () => {
    // Navigate to product details page
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div className="relative">
          <Image className="w-full h-full" imgSrc={images[currentImageIndex]} />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge text="New" />}
          {props.discount > 0 && <Badge text={`${props.discount}% OFF`} />}
        </div>
        <div className="w-full h-40 absolute bg-white -bottom-[160px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: props._id,
                    name: props.productName,
                    quantity: 1,
                    image: images[0],
                    badge: props.badge,
                    price: props.discountPrice || props.price,
                    colors: props.color,
                  })
                )
              }
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <IoMdHeartEmpty />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
        <div className="flex items-center justify-between font-titleFont">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <div className="flex flex-col items-end">
            {props.discount > 0 ? (
              <>
                <p className="text-[#767676] text-[12px] line-through">₹{props.price}</p>
                <p className="text-red-600 text-[14px] font-bold">₹{props.discountPrice?.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-[#767676] text-[14px]">₹{props.price}</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div>
        <button
          onClick={handleBuyNow}
          className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;

