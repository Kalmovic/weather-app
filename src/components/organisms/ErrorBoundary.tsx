import { Flex, Text } from "@radix-ui/themes";
import { MapPinOff } from "lucide-react";
import { Link, useRouteError } from "react-router-dom";

export const ErrorBoundary = ({ root }: { root?: boolean }) => {
  let error = useRouteError();
  console.log(error);

  return (
    <Flex
      className="flex flex-col gap-2 items-center justify-center h-full bg-sky-50 w-full"
      style={{
        height: "calc(100vh)",
      }}
    >
      <Text className="text-4xl font-bold">Oops!</Text>
      <MapPinOff className="w-24 h-24 mt-4" />
      <Text className="text-xl font-semibold">
        {root ? "Something went wrong" : "City not found"}
      </Text>
      <Text className="text-md text-center max-w-[200px]">
        {root
          ? "An unexpected error has occurred. Please try again later"
          : "We couldn't find the city you're looking for"}
      </Text>
      <Link to="/" className="text-primary" role="button">
        Go back home
      </Link>
    </Flex>
  );
};
