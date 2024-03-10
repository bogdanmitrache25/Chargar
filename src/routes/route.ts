import FrontPage from "../components/FrontPage";
import TopCars from "../components/TopCars";
import Weather from "../components/Weather";
import ChargingPoint from "../components/input/ChargingPoint";
import ChargingPointV2 from "../components/input/ChargingPointv2";
import News from "../components/input/News";
import Tips from "../components/input/Tips";

import Login from "../pages/Login";
import Register from "../pages/Register";
import UserList from "../pages/UserList";
import Welcome from "../pages/Welcome";
import Layout from "../pages/layout/Layout";

type TypeRoute = {
  path: string;
  element: any;
  isProtected?: boolean;
  children?: TypeRoute[];
};

export const routes: TypeRoute[] = [
  // Cambiado a TypeRoute[] para que sea una matriz de objetos TypeRoute

  {
    path: "/",
    element: Welcome,
  },

  {
    path: "/top-cars",
    element: TopCars,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/user",
    element: Layout,
    isProtected: true,
    children: [
      {
        path: "/user/",
        element: FrontPage,
      },
      {
        path: "/user/admin",
        element: UserList,
      },
      {
        path: "/user/weather",
        element: Weather,
      },
      {
        path: "/user/top-coches",
        element: TopCars,
      },
      {
        path: "/user/tips",
        element: Tips,
      },
      {
        path: "user/news",
        element: News,
      },
      {
        path: "/user/chargingpoint",
        element: ChargingPointV2,
      },
    ],
  },
];

// Descomentado
// <FrontPage theme={theme} />
