import { WeatherResponse } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TempUnitEnum } from "@/lib/utils";
import { useTempUnitStore } from "@/providers/useTempUnit";

export function WeatherDetailsByHour({
  weather,
}: {
  weather: WeatherResponse;
}) {
  const { tempUnit } = useTempUnitStore();
  return (
    <Flex direction="column">
      <Text size="4" my="2">
        Today
      </Text>
      <Flex gap="2" pb="2" className="overflow-x-auto">
        {weather.forecast.forecastday[0].hour.map((hour, index) => {
          if (index % 3 !== 0) return;
          return (
            <Card className="min-w-[79px]">
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
                      {format(new Date(hour.time), "hh:mm aaaaa'm'")}
                    </Text>
                  </Flex>
                </Flex>
              </CardContent>
              <CardFooter className="p-0 w-full">
                <Flex
                  gap="1"
                  className="bg-primary w-full rounded-b-xl align-middle justify-center p-1"
                >
                  <Text size="1" className="text-background">
                    {tempUnit === TempUnitEnum.Celcius
                      ? Math.round(hour.temp_c)
                      : Math.round(hour.temp_f)}
                  </Text>
                  <Text size="1" className="text-background">
                    º
                  </Text>
                </Flex>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
}
