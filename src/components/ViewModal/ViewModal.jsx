/* eslint-disable react/prop-types */

import parse from "html-react-parser";
import moment from "moment";

const ViewModal = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0" onClick={onClose}>
      <button
        className="absolute right-3 text-white text-4xl z-50"
        onClick={onClose}
      >
        &times;
      </button>
      <div
        className="bg-black/30 px-4 py-6 grid place-items-center  h-screen relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gap-10  container w-full h-[90vh]  rounded-lg overflow-auto bg-white px-6 py-4 flex flex-col justify-center ">
          <div className="flex flex-col  gap-10">
            <div className="flex flex-row justify-start gap-10">
              {data?.thumbImage && (
                <img
                  src={
                    data?.thumbImage?.secure_url
                      ? data?.thumbImage?.secure_url
                      : "No Image"
                  }
                  alt={data.slug}
                  className=" h-56 w-96 "
                />
              )}

              <div className="flex flex-col gap-6 items-start">
                <h1 className=" text-orange-400 text-3xl  font-poppins font-[600]">
                  Title : <span className="text-blue-500">{data?.title}</span>
                </h1>

                <h1 className="text-center text-orange-400 text-3xl font-poppins font-[600]">
                  Author :{" "}
                  <span className="text-blue-500">{data?.author.fullName}</span>
                </h1>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <h1 className="text-center text-orange-400 text-3xl font-poppins font-[600]">
                Published :
                <span className="text-blue-500">
                  {moment(data?.publishedAt).format("DD MMM YYYY")}
                </span>
              </h1>

              <h1 className="text-center text-orange-400 text-3xl font-poppins font-[600]">
                Category :
                <span className="text-blue-500">
                  {data?.category?.blogCategoryName}
                </span>
              </h1>
            </div>

            <h1 className="text-orange-400 text-3xl font-[600]">Content </h1>

            <p className="text-blue-500">{parse(data?.content)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
