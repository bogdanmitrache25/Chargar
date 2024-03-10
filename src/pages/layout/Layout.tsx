import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

const Layout = () => {
  // Dark Mode Feature
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "light";
    } else {
      return "light";
    }
  });

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    window.dispatchEvent(new StorageEvent("custom-storage-event-name"));
  }, [theme]);

  return (
    <>
      <Nav theme={theme} setTheme={setTheme} />

      <>
        <Outlet />
      </>

      <Footer />
    </>
  );
};

export default Layout;
