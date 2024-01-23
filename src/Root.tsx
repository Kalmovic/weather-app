import "@radix-ui/themes/styles.css";
import { Flex, Theme } from "@radix-ui/themes";
import { Footer } from "./components/footer";
import { Outlet } from "react-router-dom";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { useMediaQuery } from "usehooks-ts";

function Root() {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <Theme>
      <Flex
        className="m-auto bg-sky-50"
        style={{
          height: "100vh",
        }}
      >
        <Outlet />
        {matches ? null : <Footer />}
        <Toaster closeButton theme="light" richColors />
      </Flex>
    </Theme>
  );
}

export default Root;
