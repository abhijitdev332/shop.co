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
  // const minHeight = 600; // Set minimum height required for fullscreen

  const screenWidth = window.innerWidth || screen.width;
  const screenHeight = window.innerHeight || screen.height;

  console.log(`Screen size: ${screenWidth}x${screenHeight}`);

  if (screenWidth <= minWidth) {
    // Device meets the requirement, enter fullscreen
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Error entering fullscreen:", err);
      });
    }
  } else {
    console.log("Screen size too small for fullscreen mode.");
  }
};
