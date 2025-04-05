import { Menubar, MenubarTrigger, MenubarMenu } from "@/components/ui/menubar";

export default function TickerBar() {
  return (
    <Menubar className="flex w-full justify-start rounded-none border-b border-l-0 border-r-0 border-t bg-transparent px-4 py-2">
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
        <MenubarTrigger className="text-sm text-muted-foreground">
          24h Vol: 1.2B
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
