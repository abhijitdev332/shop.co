import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

const Loader = () => {
  // react query global fetching
  const loadingStatus = useSelector((store) => store.loader);

  return (
    <>
      {loadingStatus &&
        createPortal(
          <>
            <div className="h-screen w-screen bg-slate-500">
              <div className="flex justify-center items-center h-full w-full">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            </div>
          </>,
          document.getElementById("loader")
        )}
    </>
  );
};

export default Loader;
