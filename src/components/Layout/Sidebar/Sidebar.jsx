import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = () => {
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-4 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">PHEKU</h2>
        </div>
        <nav>
          <div className="mb-4">
            <div
              onClick={() => setIsBlogsOpen(!isBlogsOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Blogs</span>
              {isBlogsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isBlogsOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <li className="hover:text-gray-300 hover:cursor-pointer">
                  Create Blog
                </li>
                <li className="hover:text-gray-300 hover:cursor-pointer">
                  List Blogs
                </li>
              </ul>
            )}
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;