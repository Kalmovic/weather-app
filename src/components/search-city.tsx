import React from "react";
import { Input } from "./ui/input";
import { Flex, IconButton } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import { getWeather } from "@/services/getWeather";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SearchCity() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const handleSubmit = async () => {
    const cityId = search.split(" ").join("-");
    toast.info("Loading weather", {
      style: {
        bottom: "2.5rem",
      },
    });
    try {
      await getWeather(cityId);
      toast.dismiss();
      navigate(`/weather/${cityId}`);
    } catch (error) {
      toast.error("City not found", {
        duration: 5000,
        style: {
          bottom: "2.5rem",
        },
      });
    }
  };
  return (
    <Flex justify="between" gap="2" width="100%" align="center">
      <Input
        placeholder="Search City"
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton variant="surface" onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </Flex>
  );
}
