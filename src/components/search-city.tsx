import { Input } from "./ui/input";
import { Flex, IconButton } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import { getWeather } from "@/services/getWeather";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGlobalLoaderStore } from "@/providers/useGlobalLoader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const schema = () =>
  yup.object().shape({
    city: yup.string().required(),
  });

export function SearchCity() {
  const validationSchema = schema();

  const { handleSubmit, formState, control } = useForm<{
    city: string;
  }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      city: "",
    },
  });
  const navigate = useNavigate();
  const { setIsLoading } = useGlobalLoaderStore();
  const onSearch = async ({ city }: { city: string }) => {
    const cityId = city.split(" ").join("-");
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="flex items-center justify-between w-full"
      onSubmit={handleSubmit(onSearch)}
    >
      <Flex justify="between" gap="2" width="100%" align="center">
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Input placeholder="Search City" type="text" {...field} />
          )}
        />
        <IconButton
          variant="surface"
          type="submit"
          disabled={!formState.isValid}
        >
          <SearchIcon />
        </IconButton>
      </Flex>
    </form>
  );
}
