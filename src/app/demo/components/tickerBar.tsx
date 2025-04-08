import { Menubar, MenubarTrigger, MenubarMenu } from "@/components/ui/menubar";

export default function TickerBar() {
  return (
    <Menubar className="flex w-full justify-start rounded-none bg-transparent px-1 py-2 xl:px-4">
      <MenubarMenu>
        <MenubarTrigger className="text-xl">BTC/USD</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-sm text-primary">
          $43,567.89
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-green-500">+2.45%</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="hidden text-sm text-muted-foreground xl:block">
          24h: 1.2B Vol
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
