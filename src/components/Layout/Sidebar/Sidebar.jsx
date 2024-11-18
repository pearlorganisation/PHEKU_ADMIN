import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiUpload2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  return (
    <div>
      <aside className="bg-gray-800 text-white w-64 py-8 px-2 fixed top-0 bottom-0 z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">PHEKU</h2>
        </div>
        <nav>
          {/* User Section */}
          <div className="mb-4">
            <div
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>User</span>
              {isUsersOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isUsersOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="/create-users">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Create User
                  </li>
                </Link>
                <Link to="/assign-roles">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
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
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>Roles</span>
              {isRolesOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isRolesOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="create-roles">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Create Role
                  </li>
                </Link>
                <Link to="roles">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    List Roles
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/*------------course section---------------*/}
          <div className="mb-4">
            <div
              onClick={() => setIsCourseOpen(!isCourseOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>Course</span>
              {isCourseOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isCourseOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="specialization">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Create Specialization
                  </li>
                </Link>
                <Link to="course-level">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Create Course Level
                  </li>
                </Link>
                <Link to="specialization-list">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    Course Specialization List
                  </li>
                </Link>
              </ul>
            )}
          </div>

          {/* Blogs Section */}
          <div className="mb-1">
            <div
              onClick={() => setIsBlogsOpen(!isBlogsOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md"
            >
              <span>Blogs</span>
              {isBlogsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isBlogsOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <Link to="create-blogCat">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span>Create Blog Category</span>
                    </div>
                  </li>
                </Link>
                <Link to="blogCategories">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> List Blog Categories</span>
                    </div>
                  </li>
                </Link>
                <Link to="create-blogs">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> Create Blogs </span>
                    </div>
                  </li>
                </Link>
                <Link to="blogs">
                  <li className="hover:text-white cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-md">
                    <div className="flex flex-row gap-3 items-center justify-start">
                      <RiUpload2Fill /> <span> List Blogs </span>
                    </div>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
