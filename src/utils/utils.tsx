import cl from "classnames";
export const ImageLetter = ({ name = "", style = "" }) => {
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
export const DateFormat = (date) => {
  if (date) {
    return new Date(date).toLocaleDateString("en-GB");
  } else {
    return "00";
  }
};
export function updateNetworkStatus() {
  const banner = document.getElementById("offline-banner");
  if (navigator.onLine) {
    banner.style.display = "none";
  } else {
    banner.style.display = "block";
  }
}
export const enableFullscreen = () => {
  const minWidth = 640; // Set minimum width required for fullscreen

  const screenWidth = window.innerWidth || screen.width;

  if (screenWidth <= minWidth) {
    // Device meets the requirement, enter fullscreen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(err);
      });
    }
  }
};
