import { WeatherResponse } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { SearchCity } from "../search-city";
import { Badge } from "../ui/badge";
import { useTempUnitStore } from "@/providers/useTempUnit";
import { TempUnitEnum, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { WeatherDetailsByHour } from "../organisms/WeatherDetailsByHour";
import { Forecast } from "../organisms/Forecast";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  NavigationIcon,
  SunriseIcon,
  SunsetIcon,
} from "lucide-react";
import { TempSwitcher } from "../ui/tempSwitcher";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
import Spotlight, { SpotlightCard } from "../organisms/Spolight";

export function DesktopWeather({
  weather,
  isLoading,
}: {
  weather: WeatherResponse;
  isLoading: boolean;
}) {
  const { tempUnit } = useTempUnitStore();
  return (
    <Flex className="max-w-[1440px] m-auto w-full p-4 gap-4">
      <aside
        className="p-4 bg-white"
        style={{
          borderRadius: 18,
          width: "30%",
        }}
      >
        <Flex
          direction="column"
          gap="3"
          className={cn("round-lg", {
            "opacity-50 transition-opacity": isLoading,
          })}
        >
          <SearchCity />
          <Spotlight
            className="justify-center flex flex-col h-full border-sky-50 border-2 rounded-lg"
            style={{
              height: "100%",
              gridArea: "cards",
            }}
          >
            <SpotlightCard>
              <Flex
                justify="center"
                direction="row"
                gap="5"
                className="w-full p-16"
              >
                <Flex
                  justify="center"
                  direction="row"
                  gap="3"
                  className="min-w-[148px]"
                >
                  <span className="text-7xl">
                    {tempUnit === TempUnitEnum.Celcius
                      ? Math.round(weather.current.temp_c)
                      : Math.round(weather.current.temp_f)}
                  </span>
                  <Flex direction="column" justify="between">
                    <span className="text-4xl">º</span>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  justify="between"
                  className="text-muted-foreground py-2"
                >
                  <Flex
                    align="center"
                    direction="row"
                    gap="2"
                    className="w-full"
                  >
                    <Card className="p-1.5 rounded-full flex align-top bg-red-100 border-red-300 border-1">
                      <ArrowUpIcon
                        className="stroke-red-500"
                        style={{
                          width: 14,
                          height: 14,
                        }}
                      />
                    </Card>
                    <Flex className="min-w-[35px]">
                      <Text className="text-md font-medium">
                        {tempUnit === TempUnitEnum.Celcius
                          ? Math.round(
                              weather.forecast.forecastday[0].day.maxtemp_c
                            )
                          : Math.round(
                              weather.forecast.forecastday[0].day.maxtemp_f
                            )}
                      </Text>
                      <span className="text-sx">º</span>
                    </Flex>
                  </Flex>
                  <Flex
                    align="center"
                    direction="row"
                    gap="2"
                    className="w-full"
                  >
                    <Card className="p-1.5 rounded-full bg-indigo-100 border-indigo-300 border-1">
                      <ArrowDownIcon
                        className="stroke-indigo-500"
                        style={{
                          width: 14,
                          height: 14,
                        }}
                      />
                    </Card>
                    <Flex>
                      <Text className="text-md font-medium">
                        {tempUnit === TempUnitEnum.Celcius
                          ? Math.round(
                              weather.forecast.forecastday[0].day.mintemp_c
                            )
                          : Math.round(
                              weather.forecast.forecastday[0].day.mintemp_f
                            )}
                      </Text>
                      <span className="text-sx">º</span>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </SpotlightCard>
          </Spotlight>
          <Separator
            className="my-4"
            style={{
              width: "100%",
            }}
          />
          <Flex
            align="center"
            direction="row"
            gap="3"
            className="text-muted-foreground"
          >
            <img
              src={weather.current.condition.icon}
              className="border-1 border-primary rounded-full p-1 bg-white"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text>{weather.current.condition.text}</Text>
          </Flex>
          <Flex direction="column">
            <Text size="4" className="text-primary">
              {weather.location.name}
            </Text>
            <Text size="3">{weather.location.country}</Text>
            <Text size="2">
              {format(
                new Date(weather.location.localtime_epoch),
                "eeee, HH:mm"
              )}
            </Text>
          </Flex>
        </Flex>
      </aside>
      <Flex direction="column" gap="3" className="bg-sky-50 w-full">
        <Flex
          direction={{
            xs: "column-reverse",
            md: "row",
          }}
          justify="between"
        >
          <Tabs defaultValue="Today">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="Today">Today</TabsTrigger>
              <TabsTrigger value="Forecast">Forecast</TabsTrigger>
            </TabsList>
            <TabsContent value="Today">
              <WeatherDetailsByHour weather={weather} />
            </TabsContent>
            <TabsContent value="Forecast">
              <Forecast forecast={weather.forecast} />
            </TabsContent>
          </Tabs>
          <Flex
            justify={{
              xs: "start",
              md: "end",
            }}
            pb={{
              xs: "2",
              md: "0",
            }}
          >
            <TempSwitcher />
          </Flex>
        </Flex>
        <Text size="3" mt="2" className="font-medium">
          Today's highlights
        </Text>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Wind Status
                  </Text>
                </Flex>
                <Flex align="end" direction="row" gap="1">
                  <Text className="text-6xl font-thin">
                    {weather.current.wind_kph}
                  </Text>
                  <Text className="text-2xl pb-1">km/h</Text>
                </Flex>
                <Flex align="center" direction="row" gap="1" className="w-full">
                  <Card className="p-1.5 rounded-full">
                    <NavigationIcon
                      style={{
                        width: 14,
                        height: 14,
                      }}
                    />
                  </Card>
                  <Text size="3" className="font-thin">
                    {weather.current.wind_dir}
                  </Text>
                </Flex>
              </Flex>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Humidity
                  </Text>
                </Flex>
                <Flex align="start" direction="row" gap="1">
                  <Text className="text-6xl font-thin">
                    {weather.current.humidity}
                  </Text>
                  <Text className="text-2xl pt-1">%</Text>
                </Flex>
              </Flex>
            </CardContent>
            <CardFooter className="py-0 px-4 w-full">
              <Flex align="center" direction="row" gap="1" className="w-full">
                <Card className="p-1.5 rounded-full w-full">
                  <Progress value={weather.current.humidity} />
                </Card>
              </Flex>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Cloud cover
                  </Text>
                </Flex>
                <Flex align="start" direction="row" gap="1">
                  <Text className="text-6xl font-thin">
                    {weather.current.cloud}
                  </Text>
                  <Text className="text-2xl pt-1">%</Text>
                </Flex>
              </Flex>
            </CardContent>
            <CardFooter className="py-0 px-4 w-full">
              <Flex align="center" direction="row" gap="1" className="w-full">
                <img
                  src={weather.current.condition.icon}
                  alt=""
                  style={{
                    width: 26,
                    height: 26,
                  }}
                />
              </Flex>
            </CardFooter>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Feels
                  </Text>
                </Flex>
                <Flex align="start" direction="row" gap="1">
                  <Text className="text-6xl font-thin">
                    {tempUnit === TempUnitEnum.Celcius
                      ? Math.round(weather.current.feelslike_c)
                      : Math.round(weather.current.feelslike_f)}
                  </Text>
                  <Text className="text-2xl pt-1">º</Text>
                </Flex>
                <Flex align="center" direction="row" gap="1" className="w-full">
                  <Badge className="w-fit">
                    {weather.current.feelslike_c > weather.current.temp_c
                      ? "Hotter"
                      : "Colder"}
                  </Badge>
                </Flex>
              </Flex>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Sunrise & Sunset
                  </Text>
                </Flex>
                <Flex align="center" direction="row" gap="2" className="w-full">
                  <Card className="p-1.5 rounded-full bg-amber-50 border-amber-200 border-2">
                    <SunriseIcon className="stroke-amber-500" />
                  </Card>
                  <Text className="text-md font-medium">
                    {weather.forecast.forecastday[0].astro.sunrise}
                  </Text>
                </Flex>
                <Flex align="center" direction="row" gap="2" className="w-full">
                  <Card className="p-1.5 rounded-full bg-violet-50 border-violet-200 border-2">
                    <SunsetIcon className="stroke-violet-500" />
                  </Card>
                  <Text className="text-md font-medium">
                    {weather.forecast.forecastday[0].astro.sunset}
                  </Text>
                </Flex>
              </Flex>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Flex
                justify="between"
                direction="column"
                gap="3"
                className="w-full"
              >
                <Flex align="center" gap="2">
                  <Text size="3" className="text-muted-foreground">
                    Chance of rain
                  </Text>
                </Flex>
                <Flex align="start" direction="row" gap="1">
                  <Text className="text-6xl font-thin">
                    {weather.forecast.forecastday[0].day.daily_chance_of_rain}
                  </Text>
                  <Text className="text-2xl pt-1">%</Text>
                </Flex>
              </Flex>
            </CardContent>
          </Card>
        </div>
      </Flex>
    </Flex>
  );
}
