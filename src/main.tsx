import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import "./globals.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Link,
} from "react-router-dom";
import Weather, { loader as weatherLoader } from "./routes/weather";
import { MapPinOff } from "lucide-react";
import { Flex, Text } from "@radix-ui/themes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <Flex
        className="flex flex-col gap-2 items-center justify-center h-full bg-sky-50 w-full"
        style={{
          height: "calc(100vh)",
        }}
      >
        <Text className="text-4xl font-bold">Oops!</Text>
        <MapPinOff className="w-24 h-24 mt-4" />
        <Text className="text-xl font-semibold">City not found</Text>
        <Text className="text-md text-center max-w-[200px]">
          Please check the spelling or try another city
        </Text>
        <Link to="/" className="text-primary" role="button">
          Go back home
        </Link>
      </Flex>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/weather/London" />,
      },
      {
        path: "/weather/:cityId",
        element: <Weather />,
        loader: ({ params }) => weatherLoader(params.cityId as string),
        errorElement: (
          <Flex
            className="flex flex-col gap-2 items-center justify-center h-full bg-sky-50 w-full"
            style={{
              height: "calc(100vh)",
            }}
          >
            <Text className="text-4xl font-bold">Oops!</Text>
            <MapPinOff className="w-24 h-24 mt-4" />
            <Text className="text-xl font-semibold">City not found</Text>
            <Text className="text-md text-center max-w-[200px]">
              Please check the spelling or try another city
            </Text>
            <Link to="/" className="text-primary" role="button">
              Go back home
            </Link>
          </Flex>
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
