import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getWeather } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { useLoaderData } from "react-router-dom";
import { CloudIcon, DropletIcon, WavesIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TempSwitcher } from "@/components/ui/tempSwitcher";
import { TempUnitEnum, cn } from "@/lib/utils";
import { useTempUnitStore } from "@/providers/useTempUnit";

export async function loader({ params }) {
  const weather = await getWeather(params.cityId);
  return { weather };
}

export default function Weather() {
  const { weather } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { tempUnit } = useTempUnitStore();
  return (
    <Flex
      direction="column"
      gap="3"
      p="4"
      className={cn("bg-sky-50")}
      style={{
        height: "calc(100vh + 140px)",
      }}
    >
      <TempSwitcher />
      <Flex direction="column">
        <Text size="8">{weather.location.name}</Text>
        <Text size="3">
          {format(weather.location.localtime, "eeee, dd MMM")}
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
          <span className="text-2xl">
            {tempUnit === TempUnitEnum.Celcius ? "ºC" : "ºF"}
          </span>
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
      <Flex direction="column">
        <Text size="4" my="2">
          Today
        </Text>
        <Flex gap="2" pb="2" className="overflow-x-auto">
          {weather.forecast.forecastday[0].hour.map((hour) => (
            <Card>
              <CardContent className="p-2">
                <Flex
                  align="center"
                  justify="between"
                  direction="column"
                  gap="3"
                  className="w-full"
                >
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
                  >
                    <Card className="p-2 min-w-min">
                      <img
                        src={hour.condition.icon}
                        style={{
                          width: 30,
                          height: 30,
                          minHeight: 30,
                          minWidth: 30,
                        }}
                      />
                    </Card>
                    <Text size="2" className="whitespace-nowrap">
                      {format(hour.time, "hh:mm aaaaa'm'")}
                    </Text>
                  </Flex>
                </Flex>
              </CardContent>
              <CardFooter className="p-0 w-full">
                <Flex
                  gap="1"
                  className="bg-primary w-full rounded-b-lg align-middle justify-center"
                >
                  <Text size="2" className="text-background">
                    {tempUnit === TempUnitEnum.Celcius
                      ? hour.temp_c
                      : hour.temp_f}
                  </Text>
                  <Text size="1" className="text-background">
                    {tempUnit === TempUnitEnum.Celcius ? "ºC" : "ºF"}
                  </Text>
                </Flex>
              </CardFooter>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Flex direction="column">
        <Text size="4" my="2">
          Forecast (7 days)
        </Text>
        <Flex gap="2" pb="2" className="overflow-x-auto">
          {weather.forecast.forecastday.map((forecast, id) => (
            <Card>
              <CardContent className="p-2">
                <Flex
                  align="center"
                  justify="between"
                  direction="column"
                  gap="3"
                  className="w-full"
                >
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    gap="1"
                  >
                    <Card className="p-2 min-w-min">
                      <img
                        src={forecast.day.condition.icon}
                        style={{
                          width: 30,
                          height: 30,
                          minHeight: 30,
                          minWidth: 30,
                        }}
                      />
                    </Card>
                    <Text size="2">{format(forecast.date, "dd/MM")}</Text>
                    <Flex gap="1">
                      <Text size="1">
                        {tempUnit === TempUnitEnum.Celcius
                          ? forecast.day.avgtemp_c
                          : forecast.day.avgtemp_f}
                      </Text>
                      <Text size="2">
                        {tempUnit === TempUnitEnum.Celcius ? "ºC" : "ºF"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </CardContent>
            </Card>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
