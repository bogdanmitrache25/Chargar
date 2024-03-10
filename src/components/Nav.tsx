import React from "react";
import { Link } from "react-router-dom";
import { MdSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";

interface NavProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const NavLinks = [
  {
    id: "1",
    name: "INICIO 🏠",
    link: "/user",
  },
  {
    id: "2",
    name: "PUNTOS DE CARGA ⚡",
    link: "/user/chargingpoint",
  },
  {
    id: "3",
    name: "TOP COCHES 🔝",
    link: "/user/top-coches",
  },
  {
    id: "4",
    name: "CONSEJOS 💡",
    link: "/user/tips",
  },
  {
    id: "5",
    name: "NOTICIAS 🗞️",
    link: "user/news",
  },
  {
    id: "6",
    name: "TIEMPO 🌤️",
    link: "/user/weather",
  },
];

const Nav: React.FC<NavProps> = ({ theme, setTheme }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : undefined;

  return (
    <nav className="shadow-md bg-white dark:bg-dark dark:text-white duration-300">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className=" text-2xl font-bold font-serif">CharGar</h1>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center gap-4">
              {NavLinks.map((data) => (
                <li key={data.id} className="py-4">
                  <Link
                    to={data.link}
                    className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
              {user?.rol == 1 && (
                <li key={"admin"} className="py-4">
                  <Link
                    to={"/user/admin"}
                    className="py-2 hover:border-b-2 hover:text-primary hover:border-primary transition-colors duration-500 text-lg font-medium"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <button className="inline-block py-4" onClick={handleLogout}>
                CERRAR SESIÓN 🪫
              </button>

              <div>
                <h6 className="text-xm font-bold font-serif animate-bounce ">
                  hola <span className="capitalize">{user?.name} 👋</span>
                </h6>
              </div>
            </ul>
          </div>
          <div role="button" tabIndex={0}>
            {theme === "dark" ? (
              <MdSunny
                onClick={() => setTheme("light")}
                className="text-2xl  "
              />
            ) : (
              <IoMoon onClick={() => setTheme("dark")} className="text-2xl" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
