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
      <div className="h-full w-full">
        <DesktopView />
      </div>
    </div>
  );
}
