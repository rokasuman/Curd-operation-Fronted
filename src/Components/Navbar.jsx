import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
          <span className="text-xl font-bold text-gray-800">
            Book Keeping
          </span>
        </div>

        {/* Menu */}
        <ul className="flex space-x-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer transition">
            Home
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            About
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            Contact
          </li>
        </ul>

   
    </nav>
  );
};

export default Navbar;
