import React, { FC, useState } from "react";
import { IoStarSharp, IoStarOutline, IoHandLeftSharp } from "react-icons/io5";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { Star } from "../component";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

const Review = ({
  id = "",
  stats = 4,
  customerName = "",
  verified = true,
  reviewText = false,
  handleDelete,
}) => {
  const { userDetails } = useSelector((store) => store.user);
  const [isAdmin, setIsadmin] = useState(userDetails?.roles?.includes("ADMIN"));
  const handleDeleteClick = async () => {
    handleDelete(id);
  };
  return (
    <div className="outline outline-1 rounded-2xl p-3 w-[10rem] sm:w-[20rem]">
      <div className="wrapper text-black relative">
        {isAdmin && (
          <span
            className="p-2 border absolute right-5 top-3 bg-red-500 cursor-pointer hover:scale-110 duration-300 rounded-full"
            onClick={handleDeleteClick}
          >
            <FiTrash color="white" />
          </span>
        )}

        <div className="flex flex-col gap-1">
          <p className="flex gap-2">
            {/* {stars?.map(() => (
              <IoStarSharp color="orange" />
            ))} */}
            <Star count={stats} size={15} color="orange" />
          </p>
          <div className="flex items-center gap-2">
            <p className="capitalize text-lg font-medium">{customerName}</p>
            <span>
              {verified ? (
                <FaCheckCircle color="green" />
              ) : (
                <FaRegCheckCircle color="gray" />
              )}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-snug  text-ellipsis">
            {reviewText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
