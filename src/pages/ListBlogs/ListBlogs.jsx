import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../../features/actions/blogActions";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import ConfirmDeleteModal from "../../components/ConfirmModal/ConfirmDeleteModal";

const ListBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, paginate } = useSelector((state) => state.blog);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paginate?.total / paginate?.limit);

  const handlePageClick = (page) => {
    console.log(page, "current page");
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    dispatch(getBlogs({ page: currentPage }));
  }, [dispatch, currentPage]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleDelete = (roleId) => {
    setSelectedBlogId(roleId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteBlog(selectedBlogId));

    // if (Array.isArray(blogs) && blogs.length > 0)
    //   dispatch(getBlogs({ page: currentPage }));

    if (Array.isArray(blogs) && blogs.length === 1 && currentPage > 1) {
      dispatch(getBlogs({ page: currentPage - 1 }));
    } else if (Array.isArray(blogs) && blogs.length === 1 && currentPage == 1) {
      dispatch(getBlogs());
    } else if (Array.isArray(blogs)) {
      dispatch(getBlogs({ page: currentPage }));
    }

    setShowDeleteModal(false);
    // reloadiingn the page
    // window.location.reload(true);
  };

  return (
    <div className="ml-52 mt-20">
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <a href={`create-blogs`}>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Create Blog
                  </button>
                </a>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-4 w-4 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Filter
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  <div
                    id="filterDropdown"
                    className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Choose brand
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="filterDropdownButton"
                    >
                      <li className="flex items-center">
                        <input
                          id="apple"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="apple"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Apple (56)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="fitbit"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="fitbit"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Microsoft (16)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="razor"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="razor"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Razor (49)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="nikon"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="nikon"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Nikon (12)
                        </label>
                      </li>
                      <li className="flex items-center">
                        <input
                          id="benq"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="benq"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          BenQ (74)
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      S.No
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Blog Image
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Blog Title
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Published At
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 flex items-center justify-end mr-20"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs?.length > 0 && Array.isArray(blogs) ? (
                    <>
                      {blogs?.map((blog, index) => (
                        <tr
                          key={blog._id}
                          className="border-b dark:border-gray-700"
                        >
                          <td className="px-4 py-3">
                            {paginate?.limit * (currentPage - 1) + index + 1}
                          </td>
                          <th
                            scope="row"
                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <img
                              src={
                                blog.thumbImage.secure_url
                                  ? blog.thumbImage.secure_url
                                  : "https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                              }
                              // src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                              alt={blog.title}
                              className="w-20 h-20 mr-3"
                            />
                          </th>
                          <td className="px-4 py-3">{blog.title}</td>
                          <td className="px-2 py-3">
                            {blog?.author?.fullName}
                          </td>
                          <td className="px-2 py-3">
                            {blog.category.blogCategoryName}
                          </td>
                          <td className="px-2 py-3">
                            {moment(blog.publishedAt).format("D MMM YYYY")}
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                            <div className=" bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 flex flex-row gap-3 mt-5">
                                <button
                                  className=" rounded-md bg-green-500 px-4 py-2 hover:text-blue-600 text-center"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/dashboard/viewBlog/${blog._id}`);
                                  }}
                                >
                                  View
                                </button>
                                <li>
                                  <a
                                    href={`editblog/${blog.slug}`}
                                    className="block py-2 px-4 bg-blue-500  rounded-md"
                                  >
                                    Edit
                                  </a>
                                </li>

                                <li>
                                  <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="block py-2 px-4 text-sm bg-red-500 text-gray-700  rounded-md"
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <h1 className="pt-4 text-4xl"> No Blogs Found</h1>
                  )}
                </tbody>
              </table>

              {/* Delete Confirmation Modal */}
              {showDeleteModal && (
                <ConfirmDeleteModal
                  confirmDelete={confirmDelete}
                  setShowDeleteModal={setShowDeleteModal}
                />
              )}
            </div>
          </div>

          {blogs?.length > 0 && Array.isArray(blogs) && (
            <Pagination
              paginate={paginate}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ListBlogs;
