import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Pagination = ({ setPage = "", currentPage = "", totalPage = "" }) => {
  return (
    <div className="pagination">
      <div className="wrapper">
        <div className="flex w-full justify-between">
          <button className="btn btn-ghost">
            <span>
              <IoIosArrowRoundBack fontSize={30} />
            </span>
            <span>Previous</span>
          </button>
          <div className="flex gap-5">
            <button className="join-item bg-transparent btn">1</button>
            <button className="join-item bg-transparent btn">2</button>
            <button className="join-item ">...</button>
            <button className="join-item bg-transparent btn">99</button>
            <button className="join-item bg-transparent btn">100</button>
          </div>
          <button className="btn btn-ghost">
            <span>Next</span>
            <span>
              <IoIosArrowRoundForward fontSize={30} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
