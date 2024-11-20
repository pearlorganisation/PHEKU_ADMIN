import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/actions/blogActions";
import { getUserDetails } from "../../features/actions/userAction.js/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  useEffect(()=>{
    dispatch(getUserDetails());
  });

  console.log(blogs);
  return (
    <main className="flex-1 p-8">
      <div className="text-4xl font-bold mb-4">Dashboard</div>
    </main>
  );
};

export default Dashboard;
