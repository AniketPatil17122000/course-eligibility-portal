import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";



export const useLayoutViewModel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return newTheme;
        });
    };

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "dark" : "light"
        );
    }, [isDarkMode]);


  return {
    toggleSidebar, sidebarOpen, setSidebarOpen , navigate , toggleTheme , isDarkMode
  } 



};

