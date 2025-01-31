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

const setUserToLocal = (user = {}) => {
  localStorage.setItem("user", { ...user });
};
const removeUserfromLocal = (key = "user") => {
  localStorage.removeItem(key);
};

export { ImageLetter, setUserToLocal, removeUserfromLocal };
