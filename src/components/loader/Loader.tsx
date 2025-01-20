import { useIsFetching } from "@tanstack/react-query";

const Loader = () => {
  // react query global fetching
  const isFetching = useIsFetching();

  return (
    <div className="h-full w-full">
      <div className="flex justify-center items-center h-full w-full ">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );
};

export default Loader;
