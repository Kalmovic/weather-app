import * as React from "react";
import { ExternalLinkIcon } from "lucide-react";

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Flex,
  Kbd,
  Text,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounce } from "usehooks-ts";
import {
  AutoCompleteCitiesResponse,
  getAutoCompleteCities,
} from "@/services/getWeather";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useHistory } from "@/providers/useHistory";

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [isLoadingList, setIsLoadingList] = React.useState(false);
  const [value, setValue] = React.useState<string>("");
  const [cities, setCities] = React.useState<AutoCompleteCitiesResponse>(
    [] as AutoCompleteCitiesResponse
  );
  const debouncedValue = useDebounce<string>(value, 500);
  const { history: existingHistory, setHistory } = useHistory();
  let cappedHistory = existingHistory.slice(0, 3);

  const handleChange = (value: string) => {
    setValue(value);
  };
  const getList = async (debouncedValue: string) => {
    if (debouncedValue === "") return;
    try {
      setIsLoadingList(true);
      const response = await getAutoCompleteCities(debouncedValue);
      setCities(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingList(false);
    }
  };

  React.useEffect(() => {
    getList(debouncedValue);
  }, [debouncedValue]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      setValue("");
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <>
      <kbd
        onClick={() => setOpen((open) => !open)}
        className=" text-[10px] font-medium text-muted-foreground opacity-100"
      >
        <TextFieldRoot>
          <TextFieldSlot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextFieldSlot>
          <TextFieldInput
            className="font-sans text-muted-foreground border-none"
            placeholder="Search cities"
            onFocus={() => setOpen(true)}
          />
          <Kbd
            className="absolute right-0 top-0 bottom-0 flex items-center justify-center [m-[1px]] border-1 border-l-2 rounded-l-none shadow-none px-0 text-xs font-medium text-muted-foreground gap-1"
            style={{
              width: 50,
            }}
          >
            <kbd>⌘</kbd>
            <kbd>J</kbd>
          </Kbd>
        </TextFieldRoot>
      </kbd>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={value}
          placeholder="Search for a city..."
          onValueChange={handleChange}
        />
        <CommandList>
          <CommandGroup heading="History">
            {cappedHistory.map(
              (city: { name: string; country: string; region: string }) => {
                const cityName = city.name.split(" ").join("-");
                return (
                  <CommandItem key={city.name + city.country + city.region}>
                    <Link
                      onClick={() => {
                        setHistory(city);
                        toast.info("Loading weather");
                        setOpen(false);
                      }}
                      to={`/weather/${cityName}`}
                      className="relative w-full flex justify-between cursor-default select-none items-center rounded-sm text-sm outline-none hover:bg-accent aria-selected:text-accent-foreground" //aria-selected:bg-accent aria-selected:text-accent-foreground"
                    >
                      <Flex>
                        <ExternalLinkIcon className="flex items-center gap-2 w-[20px] h-[20px] mr-2" />
                        <Text>{city.name}</Text>
                      </Flex>
                      <Flex className="gap-2 ml-auto">
                        <Badge className="rounded-full" variant="secondary">
                          {city.country}
                        </Badge>
                        <Badge className="rounded-full" variant="outline">
                          {city.region}
                        </Badge>
                      </Flex>
                    </Link>
                  </CommandItem>
                );
              }
            )}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
        {isLoadingList && (
          <Flex
            justify="center"
            align="center"
            className="w-full p-6 text-xs font-medium text-muted-foreground"
          >
            Loading...
          </Flex>
        )}
        {cities && cities.length > 0 && (
          <Flex
            justify="between"
            direction="column"
            gap="3"
            className="w-full p-2"
          >
            <Text className="text-xs font-medium text-muted-foreground px-2">
              Results
            </Text>
            {cities.map((city) => {
              const cityName = city.name.split(" ").join("-");
              return (
                <Link
                  onClick={() => {
                    setHistory(city);
                    toast.info("Loading weather");
                    setOpen(false);
                  }}
                  to={`/weather/${cityName}`}
                  key={city.id}
                  className="relative flex justify-between cursor-default select-none items-center rounded-sm px-2 py-3 text-sm outline-none hover:bg-accent aria-selected:text-accent-foreground" //aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <Flex>
                    <ExternalLinkIcon className="flex items-center gap-2 w-[20px] h-[20px] mr-2" />
                    <Text>{city.name}</Text>
                  </Flex>
                  <Flex className="gap-2">
                    <Badge className="rounded-full" variant="secondary">
                      {city.country}
                    </Badge>
                    <Badge className="rounded-full" variant="outline">
                      {city.region}
                    </Badge>
                  </Flex>
                </Link>
              );
            })}
          </Flex>
        )}
      </CommandDialog>
    </>
  );
}
