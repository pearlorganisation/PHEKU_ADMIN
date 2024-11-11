import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/actions/blogActions";

const ListBlogs = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  console.log(blogs);
  return <div>ListBlogs</div>;
};

export default ListBlogs;
