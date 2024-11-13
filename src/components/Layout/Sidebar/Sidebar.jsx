import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);

  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-4 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">PHEKU</h2>
        </div>
        <nav>
          {/* User Section */}
          <div className="mb-4">
            <div
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>User</span>
              {isUsersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isUsersOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="/create-users">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Create User
                  </li>
                </Link>
                <Link to="/assign-roles">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Assign Roles
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* Roles Section */}
          <div className="mb-4">
            <div
              onClick={() => setIsRolesOpen(!isRolesOpen)}
              className="flex justify-between items-center cursor-pointer hover:text-gray-300"
            >
              <span>Roles</span>
              {isRolesOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isRolesOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="/create-roles">
                  <li className="hover:text-gray-300 cursor-pointer">
                    Create Role
                  </li>
                </Link>
                <Link to="/roles">
                  <li className="hover:text-gray-300 cursor-pointer">
                    List Roles
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* Blogs Section */}
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
