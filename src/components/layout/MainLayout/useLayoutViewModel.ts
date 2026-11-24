import { useState } from "react";

import { useNavigate } from "react-router-dom";



export const useLayoutViewModel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const navigate = useNavigate()
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };






  return {
    toggleSidebar, sidebarOpen, setSidebarOpen , navigate
  }



};

