import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Get initial status on load

  useEffect(() => {
    const handleOnline = () => setIsOnline(true); // Set online state when online event fires
    const handleOffline = () => setIsOnline(false); // Set offline state when offline event fires

    // Add event listeners for online and offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup on unmount: remove event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // This runs only once when the component mounts

  return isOnline;
}
