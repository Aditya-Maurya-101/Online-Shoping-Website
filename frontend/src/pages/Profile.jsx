import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaBoxOpen,
  FaHeart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaGlobe,
  FaMoon,
  FaHeadset,
  FaSignOutAlt,
  FaGift,
  FaUserEdit,
  FaLock,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("onlineShoppingUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("onlineShoppingUser");
    navigate("/signin");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-3xl shadow max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-3">Please Sign In</h1>

          <p className="text-gray-500 mb-6">
            Login first to access profile.
          </p>

          <Link
            to="/signin"
            className="bg-black text-white px-6 py-3 rounded-full"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const firstName = user.name?.split(" ")[0];
  const firstLetter = user.name?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f5f5f5] pb-24">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">Your Account</p>
          <h1 className="text-3xl font-bold">Profile & Settings</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl border shadow-sm p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                  {firstLetter}
                </div>

                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {user.phone || "No Phone"}
                  </p>
                </div>
              </div>
            </div>

            {/* ACCOUNT */}
            <Section title="ACCOUNT">
              <MenuItem
                icon={<FaUserEdit />}
                title="Edit Profile"
                onClick={() => navigate("/edit-profile")}
              />

              <MenuItem
                icon={<FaUserEdit />}
                title="Change Email / Mobile"
                onClick={() => navigate("/change-contact")}
              />

              <MenuItem
                icon={<FaBoxOpen />}
                title="Your Orders"
                onClick={() => navigate("/orders")}
              />

              <MenuItem
                icon={<FaHeart />}
                title="Wishlist"
                onClick={() => navigate("/wishlist")}
              />

              <MenuItem
                icon={<FaMapMarkerAlt />}
                title="Saved Addresses"
                onClick={() => navigate("/addresses")}
              />

              <MenuItem
                icon={<FaCreditCard />}
                title="Payment Methods"
                onClick={() => navigate("/payments")}
              />

              <MenuItem
                icon={<FaGift />}
                title="Coupons & Rewards"
                onClick={() => navigate("/coupons")}
              />

              <MenuItem
                icon={<FaLock />}
                title="Password & Security"
                onClick={() => navigate("/password-security")}
              />
            </Section>

            {/* PREFERENCES */}
            <Section title="PREFERENCES">
              <MenuItem
                icon={<FaGlobe />}
                title="Language Settings"
                onClick={() => navigate("/language-settings")}
              />

              <MenuItem
                icon={<FaMoon />}
                title="Appearance Settings"
                onClick={() => navigate("/appearance-settings")}
              />

              <MenuItem
                icon={<FaBell />}
                title="Notifications"
                onClick={() => navigate("/notifications")}
              />
            </Section>

            {/* SUPPORT */}
            <Section title="SUPPORT">
              <MenuItem
                icon={<FaHeadset />}
                title="Help Center"
                onClick={() => navigate("/help")}
              />

              <MenuItem
                icon={<FaHeadset />}
                title="Contact Us"
                onClick={() => navigate("/contact")}
              />
            </Section>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <p className="text-sm text-gray-500">Welcome Back</p>

              <h2 className="text-2xl font-bold mt-1">{firstName}</h2>

              <p className="text-sm text-gray-500 mt-3">
                Manage profile, orders and settings easily.
              </p>
            </div>

            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <button
                onClick={logoutHandler}
                className="w-full bg-black text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* SECTION */
const Section = ({ title, children }) => {
  return (
    <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
      <h2 className="px-5 pt-5 pb-3 text-sm font-semibold text-gray-500">
        {title}
      </h2>

      {children}
    </div>
  );
};

/* MENU ITEM */
const MenuItem = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-5 py-4 border-t flex items-center justify-between hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>

      <FaChevronRight className="text-gray-400 text-sm" />
    </div>
  );
};

export default Profile;