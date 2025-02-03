import cl from "classnames";
const ImageLetter = ({ name = "", style = "" }) => {
  return (
    <>
      <div className="avatar placeholder">
        <div
          className={cl(
            "bg-neutral text-neutral-content w-12 rounded-full",
            style
          )}
        >
          <span className="text-2xl text-primary capitalize">
            {name?.charAt(0)}
          </span>
        </div>
      </div>
    </>
  );
};

export { ImageLetter };
