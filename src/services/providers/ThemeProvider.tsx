import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext("");
const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleTheme = () => setDarkTheme(!darkTheme);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [darkTheme]);
  return (
    <ThemeContext.Provider value={[darkTheme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
