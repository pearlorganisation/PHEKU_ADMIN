import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBlogs,
  getBlogCategories,
} from "../../features/actions/blogActions";
import { ToastContainer } from "react-toastify";
import JoditEditor from "jodit-react";
import slugify from "slugify";
import { getUserDetails } from "../../features/actions/userAction.js/userAction";

const CreateBlogs = () => {
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { isLoading, blogCategories } = useSelector((state) => state.blog);
  const { adminInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getBlogCategories({ pagination: false }));
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: `${adminInfo?.data?._id}`,
      slug: "",
      category: "",
      content: "",
      thumbImage: null,
    },
  });

  console.log(blogCategories, "blog categories recieved");

  const title = watch("title");

  useEffect(() => {
    if (title) {
      const slug = slugify(title, {
        lower: true,
        strict: true,
      });
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    console.log("Form Data 255", data);

    const formData = new FormData();
    formData.append("thumbImage", image);

    dispatch(createBlogs(data)).then((res) => {
      console.log("page 10101", res);
    });
  };

  const config = {
    readonly: false,
    height: 400,
    toolbar: true,
    // buttons: [
    //   "bold",
    //   "italic",
    //   "underline",
    //   "|",
    //   "ul",
    //   "ol",
    //   "|",
    //   "outdent",
    //   "indent",
    //   "|",
    //   "align",
    //   "|",
    //   "link",
    //   "image",
    //   "video",
    //   "|",
    //   "source",
    // ],
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "superscript",
      "subscript",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "video",
      "file",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "selectall",
      "|",
      "print",
      "about",
    ],
    uploader: {
      insertImageAsBase64URI: true,
      url: "your-upload-url", // If you have a file upload URL
      format: "json",
    },
    placeholder: "Start typing here...",
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    spellcheck: true,
    allowResizeY: true,
    allowResizeX: false,
    language: "en",
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
  };

  return (
    <div className="mt-20 ml-72">
      <div className="container mx-auto p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-md shadow-md p-8"
        >
          {/* Image Upload Section */}
          <div className="mb-6">
            <label
              htmlFor="thumbImage"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Blog Image
            </label>
            <input
              type="file"
              id="thumbImage"
              accept="image/*"
              {...register("thumbImage", {
                required: "Blog image is required",
                onChange: (e) => {
                  handleImageChange(e);
                },
              })}
              className={`block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                            ${
                              errors.thumbImage
                                ? "border-red-500"
                                : "border-gray-300"
                            } 
                            rounded-lg focus:ring-blue-500 focus:border-blue-500`}
            />
            {/* Display image preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="h-40 w-auto rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          {/* Blog Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/*Slug*/}

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Slug
            </label>
            <input
              type="text"
              {...register("slug")}
              readOnly
              className={`shadow-sm bg-gray-50 border ${
                errors.slug ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
            />
          </div>

          {/* Author*/}
          <div className="mb-6">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              disabled={true}
              {...register("author", { required: "Author is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.author ? "border-red-500" : "border-gray-300"
              } 
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                            block w-full p-2.5`}
              placeholder="Enter Author"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Blog Categories */}
          <div className="mb-6">
            <label htmlFor="category">Blog Category</label>
            <select
              {...register("category", {
                required: "Please select a category",
              })}
            >
              <option value="">Choose Option</option>
              {blogCategories?.map((blogCat) => (
                <option key={blogCat._id} value={blogCat._id}>
                  {blogCat.blogCategoryName}
                </option>
              ))}
            </select>
            {errors.category && <p>{errors.category.message}</p>}
          </div>

          {/* Blog Body */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <Controller
              control={control}
              name="content"
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <JoditEditor
                  ref={editorRef}
                  value={field.value}
                  config={config}
                  onBlur={field.onBlur}
                  onChange={(content) => field.onChange(content)}
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content?.message}
              </p>
            )}
          </div>
          {isLoading ? (
            <>
              <button
                type="submit"
                className=" bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Please Wait ...
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className=" bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save Blog
              </button>
            </>
          )}
          {/* Submit Button */}

          {/* Toast Container */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBlogs;
