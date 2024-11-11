import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="text-xl font-bold">PHEKU</div>
      {/* <input
        type="text"
        placeholder="Search"
        className="bg-gray-100 text-black px-3 py-1 rounded-lg"
      /> */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white">
          Forum
        </a>
        <a href="#" className="text-white">
          Get Help
        </a>
        <div className="relative">
          <span className="bg-red-500 text-xs text-white rounded-full px-2 absolute -top-2 -right-2">
            2
          </span>
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="rounded-full w-8 h-8"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
