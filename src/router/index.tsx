import { createBrowserRouter, Navigate } from "react-router-dom";
import Client from "../layout/Client";
import Home from "../page/Home";
import Room from "../page/Room";

export const clientRouter = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Navigate to={"/"} />,
        children: [
          {
            path: ":id",
            element: <Room />,
          },
        ],
      },

      {
        path: "/about",
        element: (
          <div className="container">
            <h4>About</h4>
          </div>
        ),
      },
    ],
  },
]);
