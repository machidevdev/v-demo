import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import Navbar from "./components/navbar";
import TickerBar from "./components/tickerBar";
import OrderBook from "./components/orderbook";
import { Menubar, MenubarItem } from "@/components/ui/menubar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trade } from "./components/trade";
import DesktopView from "./desktopView";
import Positions from "./components/positions";
export default function DemoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col border p-2 xl:h-screen">
      <Navbar />
      <TickerBar />
      <div className="hidden h-full w-full xl:flex">
        <DesktopView />
      </div>
      <div className="flex flex-col xl:hidden">
        <div className="flex aspect-square w-full items-center justify-center">
          Chart
        </div>
        <Tabs>
          <TabsList>
            <TabsTrigger value="history">OrderBook</TabsTrigger>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <OrderBook />
          </TabsContent>
          <TabsContent value="trade">
            <Trade />
          </TabsContent>
          <TabsContent value="positions">
            <Positions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
