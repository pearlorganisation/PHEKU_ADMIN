import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleBlogCategory,
  updateBlogCategory,
} from "../../features/actions/blogActions";

const EditBlogCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    blogCategoryName: "",
  });

  const { blogCategory } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getSingleBlogCategory(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (blogCategory) {
      setFormData({
        blogCategoryName: blogCategory.blogCategoryName || "",
      });
    }
  }, [blogCategory]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateBlogCategory({ id, data: formData }));
    setTimeout(() => {
      dispatch(getSingleBlogCategory(id));
    }, 100);
  };

  if (!blogCategory) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex-1 p-8 mt-16 ml-64">
      <div className="text-4xl font-bold mb-4">Edit Blog Category</div>
      <form onSubmit={submitForm}>
        <div className="mb-4">
          <label
            htmlFor="blogCategoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Category Name
          </label>
          <input
            type="text"
            id="blogCategoryName"
            name="blogCategoryName"
            value={formData.blogCategoryName}
            onChange={handleChange}
            className="mt-1 p-2 block w-full rounded-md border-purple-300 border-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Blog Category
        </button>
      </form>
    </main>
  );
};

export default EditBlogCategory;
