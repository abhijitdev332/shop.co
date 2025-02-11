import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const DataLoader = () => {
  // react query global fetching
  const { status } = useSelector((store) => store.loader);
  return (
    <>
      {status &&
        createPortal(
          <>
            <div className="h-screen w-screen fixed top-0 z-50 bg-slate-800">
              <div className="flex justify-center items-center h-full w-full">
                <span className="loading loading-spinner text-white loading-lg"></span>
              </div>
            </div>
          </>,
          document.getElementById("loader")
        )}
    </>
  );
};

export default DataLoader;
