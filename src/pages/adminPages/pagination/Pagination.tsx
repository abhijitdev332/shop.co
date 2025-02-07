import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import cl from "classnames";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
const Pagination = ({
  setPage = undefined,
  currentPage = 0,
  totalPage = 0,
  itemperPage = 5,
  totalLen = 0,
}) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const handlePrevious = () => {
    if (currentPage <= 1) {
      toast.info("you are at starting postion");
    } else {
      setPage(currentPage - 1);
      setSearchParam({ page: Number(currentPage - 1) });
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      setSearchParam({ page: Number(currentPage + 1) });
      return setPage(currentPage + 1);
    } else {
      toast.info("youre at end page");
    }
  };
  const handleBtnClick = (e) => {
    setSearchParam({ page: Number(e) });
    return setPage(e);
  };
  return (
    <div className="pagination ">
      <div className="outline outline-1 outline-slate-300"></div>
      <div className="wrapper px-3 py-2">
        <div className="flex w-full justify-between">
          {/* <p>Showing 1-5 0f 100 Items</p> */}
          <p className="text-xs">
            <span>
              Showing &nbsp;
              {(currentPage - 1) * itemperPage}-
              {currentPage * itemperPage > totalLen
                ? totalLen
                : currentPage * itemperPage}
            </span>
            &nbsp; OF
            <span>{totalLen}</span>
          </p>
          <div className="flex items-center gap-3">
            <button className="btn btn-sm btn-ghost" onClick={handlePrevious}>
              <span>
                <IoIosArrowRoundBack fontSize={30} />
              </span>
            </button>
            <div className="flex gap-3">
              {/* {Array.from({ length: totalPage }, (_, index) => {
                if (index >= 5) {
                  return;
                } else {
                  return (
                    <button
                      className={cl(
                        "join-item  btn btn-xs sm:btn-sm",
                        +currentPage == index + 1
                          ? "!btn-neutral"
                          : " bg-transparent"
                      )}
                      onClick={() => handleBtnClick(index + 1)}
                    >
                      {index + 1}
                    </button>
                  );
                }
              })} */}
              <button className={cl("join-item  btn btn-xs sm:btn-sm")}>
                {currentPage}
              </button>
            </div>
            <button className="btn btn-sm btn-ghost" onClick={handleNext}>
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
