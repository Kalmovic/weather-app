import { TempUnitEnum, cn } from "@/lib/utils";
import { WeatherResponse } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { TempSwitcher } from "../ui/tempSwitcher";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { CloudIcon, DropletIcon, WavesIcon } from "lucide-react";
import { useTempUnitStore } from "@/providers/useTempUnit";
import { WeatherDetailsByHour } from "../organisms/WeatherDetailsByHour";
import { Forecast } from "../organisms/Forecast";

export function MobileWeather({
  weather,
  isLoading,
}: {
  weather: WeatherResponse;
  isLoading: boolean;
}) {
  const { tempUnit } = useTempUnitStore();
  return (
    <Flex
      direction="column"
      gap="3"
      p="4"
      className={cn("bg-sky-50 w-full", {
        "opacity-50 transition-opacity": isLoading,
      })}
      style={{
        height: "calc(100vh + 140px)",
      }}
    >
      <TempSwitcher />
      <Flex direction="column">
        <Text size="8">{weather.location.name}</Text>
        <Text size="3">
          {format(weather.location.localtime_epoch, "eeee, dd MMM")}
        </Text>
      </Flex>
      <Badge className="w-fit mx-auto">{weather.current.condition.text}</Badge>
      <Flex justify="center" direction="row" gap="3" className="w-full">
        <span className="text-8xl">
          {tempUnit === TempUnitEnum.Celcius
            ? weather.current.temp_c
            : weather.current.temp_f}
        </span>
        <Flex direction="column" justify="between">
          <span className="text-4xl">º</span>
          <img
            src={weather.current.condition.icon}
            className="border-1 border-primary rounded-full p-1 bg-white"
            style={{
              width: 50,
              height: 50,
            }}
          />
        </Flex>
      </Flex>
      <Card>
        <CardContent className="p-4">
          <Flex
            align="center"
            justify="between"
            direction="row"
            gap="3"
            className="w-full"
          >
            <Flex align="center" gap="2">
              <Card className="p-2 bg-emerald-50 border-emerald-200">
                <WavesIcon />
              </Card>
              <Text size="3">Wind</Text>
            </Flex>
            <Text size="2">{weather.current.wind_kph} km/h</Text>
          </Flex>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <Flex
            align="center"
            justify="between"
            direction="row"
            gap="3"
            className="w-full"
          >
            <Flex align="center" gap="2">
              <Card className="p-2 bg-purple-50 border-purple-200">
                <DropletIcon />
              </Card>
              <Text size="3">Humidity</Text>
            </Flex>
            <Text size="2">{weather.current.humidity}%</Text>
          </Flex>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <Flex
            align="center"
            justify="between"
            direction="row"
            gap="3"
            className="w-full"
          >
            <Flex align="center" gap="2">
              <Card className="p-2 bg-blue-50 border-blue-200">
                <CloudIcon />
              </Card>
              <Text size="3">Cloud cover</Text>
            </Flex>
            <Text size="2">{weather.current.cloud}%</Text>
          </Flex>
        </CardContent>
      </Card>
      <WeatherDetailsByHour weather={weather} />
      <Forecast forecast={weather.forecast} />
    </Flex>
  );
}
