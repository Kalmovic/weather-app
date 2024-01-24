import { WeatherResponse } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TempUnitEnum } from "@/lib/utils";
import { useTempUnitStore } from "@/providers/useTempUnit";

export function Forecast({
  forecast,
}: {
  forecast: WeatherResponse["forecast"];
}) {
  const { tempUnit } = useTempUnitStore();

  return (
    <Flex direction="column">
      <Text
        size="3"
        my="2"
        className="font-medium"
        aria-label="Forecast (7 days)"
      >
        Forecast (7 days)
      </Text>
      <Flex gap="2" className="overflow-x-auto">
        {forecast.forecastday.map((forecast) => {
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
                        src={forecast.day.condition.icon}
                        style={{
                          width: 30,
                          height: 30,
                          minHeight: 30,
                          minWidth: 30,
                        }}
                      />
                    </Card>
                    <Text size="2">
                      {format(new Date(`${forecast.date}T00:00:00`), "dd/MM")}
                    </Text>
                  </Flex>
                </Flex>
              </CardContent>
              <CardFooter className="p-0 w-full">
                <Flex
                  gap="1"
                  className="bg-secondary w-full rounded-b-xl align-middle justify-center py-1 px-2"
                >
                  <Flex>
                    <Text size="1">
                      {tempUnit === TempUnitEnum.Celcius
                        ? Math.round(forecast.day.maxtemp_c)
                        : Math.round(forecast.day.maxtemp_f)}
                    </Text>
                    <Text size="1">º</Text>
                  </Flex>
                  <Flex>
                    <Text size="1" className="opacity-60">
                      {tempUnit === TempUnitEnum.Celcius
                        ? Math.round(forecast.day.mintemp_c)
                        : Math.round(forecast.day.mintemp_f)}
                    </Text>
                    <Text size="1" className="opacity-60">
                      º
                    </Text>
                  </Flex>
                </Flex>
              </CardFooter>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
}
