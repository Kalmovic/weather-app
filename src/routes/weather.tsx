import { getWeather } from "@/services/getWeather";
import { useLoaderData } from "react-router-dom";
import { useGlobalLoaderStore } from "@/providers/useGlobalLoader";
import { useMediaQuery } from "usehooks-ts";
import { DesktopWeather } from "@/components/pages/DesktopWeather";
import { MobileWeather } from "@/components/pages/MobileWeather";

export async function loader(cityId: string) {
  const weather = await getWeather(cityId);
  return { weather };
}

export default function Weather() {
  const { isLoading } = useGlobalLoaderStore();
  const { weather } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const matches = useMediaQuery("(min-width: 768px)");
  return matches ? (
    <DesktopWeather weather={weather} isLoading={isLoading} />
  ) : (
    <MobileWeather weather={weather} isLoading={isLoading} />
  );
}
