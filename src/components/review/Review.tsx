import React, { FC, useState } from "react";
import { IoStarSharp, IoStarOutline, IoHandLeftSharp } from "react-icons/io5";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { Star } from "../component";
interface ReviewProps {
  stats: number;
  customerName: string;
  verified: boolean;
  reviewText: string;
}
const Review: FC<ReviewProps> = ({
  stats = 4,
  customerName,
  verified = true,
  reviewText,
}) => {
  return (
    <div className="outline outline-1 rounded-2xl p-3 w-fit sm:w-[20rem]">
      <div className="wrapper text-black">
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
            "{reviewText}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
