import React from "react";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { slug } = useParams();

  console.log(slug, "id from params");
  return (
    <div className="ml-72 mt-20">
      <h1> Edit Blog Page </h1>

      <h1> Blog Id : {slug}</h1>
    </div>
  );
};

export default EditBlog;
