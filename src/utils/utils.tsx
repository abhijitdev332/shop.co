import cl from "classnames";
const ImageLetter = ({ name = "", style = "" }) => {
  return (
    <>
      <div className="avatar placeholder">
        <div
          className={cl(
            "bg-neutral text-neutral-content w-16 rounded-full",
            style
          )}
        >
          <span className="text-3xl text-primary">{name?.charAt(0)}</span>
        </div>
      </div>
    </>
  );
};

export { ImageLetter };
