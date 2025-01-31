const LoaderScreen = () => {
  return (
    <div className="h-screen w-full bg-gray-800">
      <div className="flex justify-center items-center h-full w-full ">
        <span className="loading loading-spinner text-white loading-lg"></span>
      </div>
    </div>
  );
};

export default LoaderScreen;
