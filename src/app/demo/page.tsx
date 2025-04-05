import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import Navbar from "./components/navbar";
import TickerBar from "./components/tickerBar";
import OrderBook from "./components/orderbook";
import MobileView from "./mobileView";
import { Menubar, MenubarItem } from "@/components/ui/menubar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export default function DemoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col border p-2 xl:h-screen">
      <Navbar />
      <TickerBar />
      <div className="hidden h-full w-full xl:flex">
        <MobileView />
      </div>
      <div className="flex flex-col xl:hidden">
        <div className="flex aspect-square w-full items-center justify-center">
          Chart
        </div>
        <Tabs>
          <TabsList>
            <TabsTrigger value="history">OrderBook</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>
          <TabsContent value="history">
            <OrderBook />
          </TabsContent>
          <TabsContent value="commands">Commands</TabsContent>
          <TabsContent value="positions">Positions</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
