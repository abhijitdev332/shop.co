import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Pagination = ({ setPage = "", currentPage = "", totalPage = "" }) => {
  return (
    <div className="pagination ">
      <div className="outline outline-1 outline-slate-300"></div>
      <div className="wrapper px-3 py-2">
        <div className="flex w-full justify-between">
          <p>Showing 1-10 0f 100 Items</p>

          <div className="flex items-center gap-3">
            <button className="btn btn-sm btn-ghost">
              <span>
                <IoIosArrowRoundBack fontSize={30} />
              </span>
            </button>
            <div className="flex gap-3">
              <button className="join-item bg-transparent btn btn-sm">1</button>
              <button className="join-item bg-transparent btn btn-sm">2</button>
              <button className="join-item bg-transparent btn btn-sm">
                99
              </button>
              <button className="join-item bg-transparent btn btn-sm">
                100
              </button>
              <button className="join-item bg-transparent btn btn-sm">
                ...
              </button>
            </div>
            <button className="btn btn-sm btn-ghost">
              <span>
                <IoIosArrowRoundForward fontSize={30} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
