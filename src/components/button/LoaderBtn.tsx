import cl from "classnames";
const LoaderBtn = ({
  pending = false,
  handleClick,
  style = "",
  children,
  ...others
}) => {
  return (
    <button
      className={cl("btn btn-neutral flex items-center", style)}
      onClick={handleClick}
      {...others}
    >
      {pending && (
        <span className="loading loading-spinner text-white loading-md"></span>
      )}
      {children}
    </button>
  );
};

export default LoaderBtn;
