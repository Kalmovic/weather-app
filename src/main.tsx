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
import { MapPinOff } from "lucide-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="/weather/London" />,
      },
      {
        path: "/weather/:cityId",
        element: <Weather />,
        loader: weatherLoader,
        errorElement: (
          <div
            className="flex flex-col gap-2 items-center justify-center h-full bg-muted"
            style={{
              height: "calc(100vh )",
            }}
          >
            <h1 className="text-4xl font-bold">Oops!</h1>
            <MapPinOff className="w-24 h-24 mt-4" />
            <p className="text-xl font-semibold">City not found</p>
            <p className="text-md text-center max-w-[200px]">
              Please check the spelling or try another city
            </p>
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
