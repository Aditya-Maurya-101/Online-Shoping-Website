import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, resetCart } from '../redux/onlineShoppingSlice';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = location.state?.item || {};
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.img];

  useEffect(() => {
    // If no product data from state, fetch from API
    if (!location.state?.item && location.pathname) {
      const productId = location.pathname.split('/').pop();
      // In a real app, you'd fetch product details from API
      console.log('Fetching product:', productId);
    }
  }, [location]);

  const handleBuyNow = () => {
    // Clear cart and add only this product
    dispatch(resetCart());
    dispatch(
      addToCart({
        _id: product._id,
        name: product.productName,
        quantity: quantity,
        image: images[0],
        badge: product.badge,
        price: product.discountPrice || product.price,
        colors: product.color,
      })
    );
    // Navigate to checkout directly
    setTimeout(() => navigate('/checkout'), 100);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.productName,
        quantity: quantity,
        image: images[0],
        badge: product.badge,
        price: product.discountPrice || product.price,
        colors: product.color,
      })
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  if (!product.productName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.productName}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {renderStars(product.rating || 4)}
                </div>
                <span className="text-gray-600">({product.reviews?.length || 0} reviews)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center space-x-4 mb-4">
                {product.discount > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      ₹{product.discountPrice?.toFixed(2) || product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                )}
              </div>

              {product.discount > 0 && (
                <p className="text-green-600 font-medium mb-4">
                  You save ₹{((product.price - (product.discountPrice || product.price)) * quantity).toFixed(2)} ({product.discount}%)
                </p>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label className="font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-colors text-lg"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <FaHeart />
                  <span>Add to Wishlist</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Product Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium">{product.brand || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{product.color || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;