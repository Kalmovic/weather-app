import { SearchCity } from "./search-city";
import { Flex } from "@radix-ui/themes";

export function Header() {
  return (
    <header className="flex items-center px-4 py-2 w-full border-t-2 fixed bottom-0 bg-white z-10">
      <Flex justify="between" gap="2" width="100%">
        <SearchCity />
      </Flex>
    </header>
  );
}
