import { TempUnit, TempUnitEnum, cn } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useTempUnitStore } from "@/providers/useTempUnit";
import { useMediaQuery } from "usehooks-ts";

export function TempSwitcher() {
  const matches = useMediaQuery("(min-width: 768px)");
  const { tempUnit, setTempUnit } = useTempUnitStore();
  const handleTempChange = (temp: TempUnit) => {
    localStorage.setItem("tempUnit", temp);
    setTempUnit(temp);
  };

  return (
    <Flex>
      <Tabs
        defaultValue={tempUnit}
        className={cn("h-fit", {
          "w-full": !matches,
        })}
      >
        <TabsList
          className={cn("grid w-full grid-cols-2", {
            "bg-primary text-background w-fit": matches,
            "w-full": !matches,
          })}
        >
          <TabsTrigger
            value={TempUnitEnum.Celcius}
            onClick={() => handleTempChange(TempUnitEnum.Celcius)}
            className="px-3"
          >
            ºC
          </TabsTrigger>
          <TabsTrigger
            value={TempUnitEnum.Fahrenheit}
            onClick={() => handleTempChange(TempUnitEnum.Fahrenheit)}
            className="px-3"
          >
            ºF
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </Flex>
  );
}
