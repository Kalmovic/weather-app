import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Header as Footer } from "./components/header";
import { Outlet } from "react-router-dom";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

function Root() {
  return (
    <Theme>
      <Outlet />
      <Footer />
      <Toaster closeButton theme="light" richColors />
    </Theme>
  );
}

export default Root;
