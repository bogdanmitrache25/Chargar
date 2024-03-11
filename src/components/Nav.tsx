import React, { useState } from "react";
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
    name: "INICIO ",
    link: "/user",
  },
  {
    id: "2",
    name: "PUNTOS DE CARGA ⚡",
    link: "/user/chargingpoint",
  },
  {
    id: "3",
    name: "TOP COCHES ",
    link: "/user/top-coches",
  },

  {
    id: "5",
    name: "INTELIGENCIA ARTIFICIAL ",
    link: "user/ia",
  },
  {
    id: "6",
    name: "TIEMPO 🌤️",
    link: "/user/weather",
  },
];

const Nav: React.FC<NavProps> = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);

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
            <h1 className="text-2xl font-bold font-serif">CharGar</h1>
          </div>
          <div className="md:hidden">
            <button
              className="block text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
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
                CERRAR SESIÓN
              </button>

              <div>
                <h6 className="text-xm font-bold font-serif animate-bounce">
                  hola <span className="capitalize">{user?.name} 👋</span>
                </h6>
              </div>
            </ul>
          </div>
          <div role="button" tabIndex={0}>
            {theme === "dark" ? (
              <MdSunny onClick={() => setTheme("light")} className="text-2xl" />
            ) : (
              <IoMoon onClick={() => setTheme("dark")} className="text-2xl" />
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NavLinks.map((data) => (
              <li key={data.id}>
                <Link
                  to={data.link}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {data.name}
                </Link>
              </li>
            ))}
            {user?.rol == 1 && (
              <li>
                <Link
                  to={"/user/admin"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button
                className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={handleLogout}
              >
                CERRAR SESIÓN
              </button>
            </li>
            <li>
              <h6 className="block px-3 py-2 text-xs font-bold font-serif animate-bounce">
                hola <span className="capitalize">{user?.name} 👋</span>
              </h6>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
