import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import "./globals.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Weather, { loader as weatherLoader } from "./routes/weather";
import { ErrorBoundary } from "./components/organisms/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    hasErrorBoundary: true,
    element: <Root />,
    errorElement: <ErrorBoundary root />,
    children: [
      {
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Navigate to="/weather/London" />,
          },
          {
            path: "/weather/:cityId",
            element: <Weather />,
            loader: ({ params }) => weatherLoader(params.cityId as string),
          },
        ],
      },
      {
        path: "*",
        element: <ErrorBoundary />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
