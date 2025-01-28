import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { toast } from "react-toastify";
import cl from "classnames";

const Pagination = ({ setPage = "", currentPage = "", totalPage = "" }) => {
  const handlePrevious = () => {
    if (currentPage <= 1) {
      toast.info("you are at starting postion");
    } else {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      return setPage(currentPage + 1);
    } else {
      toast.info("youre at end page");
    }
  };
  const handleBtnClick = () => {};
  return (
    <div className="pagination">
      <div className="wrapper">
        <div className="flex w-full justify-between">
          <button className="btn btn-ghost" onClick={handlePrevious}>
            <span>
              <IoIosArrowRoundBack fontSize={30} />
            </span>
            <span>Previous</span>
          </button>
          <div className="flex gap-5">
            {Array.from({ length: totalPage }, (_, index) => {
              if (index > 6) {
                return;
              } else {
                return (
                  <button
                    className={cl(
                      "join-item bg-transparent btn",
                      +currentPage == index + 1 ? "!btn-secondary" : ""
                    )}
                    onClick={handleBtnClick}
                  >
                    {index + 1}
                  </button>
                );
              }
            })}
            {/*    
         
            <button className="join-item bg-transparent btn">99</button>
            <button className="join-item bg-transparent btn">100</button> */}
            <button className="join-item bg-transparent btn ">...</button>
          </div>
          <button className="btn btn-ghost" onClick={handleNext}>
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
