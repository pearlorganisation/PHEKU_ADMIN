import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { getSingleBlog } from "../../features/actions/blogActions";
import moment from "moment";

const ViewBlog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { singleBlog } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, []);

  console.log(singleBlog, "single Blog Info");

  return (
    <div className="mx-5 space-y-12 ml-72 mt-20">
      {/* Blog Title */}
      <div>
        <h1 className="text-3xl">
          Blog Title:{" "}
          <span className="text-orange-400">{singleBlog?.title}</span>
        </h1>
      </div>

      {/* Quantity */}
      <div>
        <h2 className="text-2xl">
          {" "}
          Published At : {moment(singleBlog?.publishedAt).format("DD MMM YYYY")}
        </h2>
      </div>

      {/* Banner Image */}
      <div>
        <h1 className="text-4xl">Blog Image</h1>
        <img
          src={singleBlog?.thumbImage?.secure_url}
          alt="Blog Banner"
          className="w-96 h-96 object-cover rounded-md"
        />
      </div>

      {/* Brand */}
      <div>
        <h1 className="text-5xl">Category</h1>
        <h2 className="text-2xl text-gray-700">
          {singleBlog?.category?.blogCategoryName}
        </h2>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h1 className="text-3xl">Author</h1>
        <div className="text-lg">
          <p>
            Email:{" "}
            <span className="font-semibold">{singleBlog?.author.email}</span>
          </p>
          <p>
            Full Name:{" "}
            <span className="font-semibold">{singleBlog?.author.fullName}</span>
          </p>
          <p>
            Role:{" "}
            <span className="font-semibold text-green-600">
              {singleBlog?.author.role}
            </span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        <h1 className="text-5xl">Content</h1>
        <p className="text-gray-800 leading-relaxed mt-4">
          {singleBlog?.content && parse(singleBlog?.content)}
        </p>
      </div>
    </div>
  );
};

export default ViewBlog;
