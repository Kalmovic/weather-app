import { WeatherResponse } from "@/services/getWeather";
import { Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "../ui/card";
import { TempUnitEnum, cn } from "@/lib/utils";
import { useTempUnitStore } from "@/providers/useTempUnit";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  YAxis,
} from "recharts";
import { useMediaQuery } from "usehooks-ts";
import "./chart.css";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  const { tempUnit } = useTempUnitStore();
  if (active && payload && payload.length) {
    const data = payload[0].payload;

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
            <Flex direction="column" align="center" justify="center" gap="1">
              <Card className="p-2 min-w-min">
                <img
                  src={data.condition.icon}
                  style={{
                    width: 30,
                    height: 30,
                    minHeight: 30,
                    minWidth: 30,
                  }}
                />
              </Card>
              <Text size="2" className="whitespace-nowrap">
                {format(new Date(data.time), "hh:mm aaaaa'm'")}
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
                ? Math.round(data.temp_c)
                : Math.round(data.temp_f)}
            </Text>
            <Text size="1" className="text-background">
              º
            </Text>
          </Flex>
        </CardFooter>
      </Card>
    );
  }

  return null;
};

const CustomizedAxisTick = (props: any) => {
  const { payload, x, y } = props;
  return (
    <g>
      <text
        x={x}
        y={y}
        dy={16}
        fill="currentColor"
        className={cn("text-xs text-muted-foreground", {
          "text-right": props.index === 0,
        })}
        fontSize={5}
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomizedYAxisTick = (props: any) => {
  const { payload, x, y } = props;
  return (
    <g>
      <text
        x={x}
        y={y}
        dx={-16}
        fill="currentColor"
        className={cn("text-xs text-muted-foreground text-right", {
          hidden: props.index === 0,
        })}
        fontSize={5}
      >
        {payload.value}º
      </text>
    </g>
  );
};

export function WeatherDetailsByHour({
  weather,
}: {
  weather: WeatherResponse;
}) {
  const matches = useMediaQuery("(min-width: 768px)");
  const { tempUnit } = useTempUnitStore();
  return (
    <Flex direction="column">
      <Text
        size="3"
        my="2"
        className="font-medium"
        aria-label="Todays temperature"
      >
        Today's temperature
      </Text>
      <Flex
        style={{
          width: "100%",
          height: 114,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveContainer>
          <AreaChart
            className={cn("w-full", {
              "min-w-[600px]": matches,
            })}
            data={weather.forecast.forecastday[0].hour}
            margin={{ top: 10, left: -30, bottom: 0, right: 0 }}
          >
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="30%" stopColor="#71a1ce" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <YAxis
              yAxisId="left"
              tick={<CustomizedYAxisTick />}
              tickFormatter={(value) => {
                return `${value}º`;
              }}
            />
            <XAxis
              dataKey={(entry) => {
                return format(new Date(entry.time), "h a");
              }}
              tick={<CustomizedAxisTick />}
              interval={matches ? 2 : 6}
            />
            <Tooltip content={CustomTooltip} active={true} />
            <Area
              yAxisId="left"
              animationDuration={400}
              animationEasing="ease-in-out"
              type="basis"
              dataKey={tempUnit === TempUnitEnum.Celcius ? "temp_c" : "temp_f"}
              strokeWidth={3}
              fill={"url(#colorBlue)"}
              height={200}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
}
