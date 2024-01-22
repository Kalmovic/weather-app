import { TempUnit, TempUnitEnum } from "@/lib/utils";
import { Flex } from "@radix-ui/themes";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useTempUnitStore } from "@/hooks/useTempUnit";

export function TempSwitcher() {
  const { tempUnit, setTempUnit } = useTempUnitStore();
  const handleTempChange = (temp: TempUnit) => {
    localStorage.setItem("tempUnit", temp);
    setTempUnit(temp);
  };

  return (
    <Flex className="w-full">
      <Tabs defaultValue={tempUnit} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
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
