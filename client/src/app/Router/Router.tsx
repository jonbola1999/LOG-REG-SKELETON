import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

import NotFound from "../../pages/NotFound/NotFound";
import HomePage from "../../pages/HomePage/HomePage";
import LogPage from "../../pages/LogPage/LogPage";
import RegPage from "../../pages/RegPage/RegPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/log",
        element: <LogPage />,
      },
      {
        path: "/reg",
        element: <RegPage />,
      },
      {
        path: "/homepage",
        element: <HomePage />,
      },
    ],
  },
]);
