import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import Navbar from "./demo/components/navbar";
import TickerBar from "./demo/components/tickerBar";
import OrderBook from "./demo/components/orderbook";
import { Menubar, MenubarItem } from "@/components/ui/menubar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trade } from "./demo/components/trade";
import DesktopView from "./demo/desktopView";
import Positions from "./demo/components/positions";
export default function DemoPage() {
import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import Navbar from "./demo/components/navbar";
import TickerBar from "./demo/components/tickerBar";
import OrderBook from "./demo/components/orderbook";
import { Menubar, MenubarItem } from "@/components/ui/menubar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trade } from "./demo/components/trade";
import DesktopView from "./demo/desktopView";
import Positions from "./demo/components/positions";
export default function DemoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col border p-2">
      <Navbar />
      <TickerBar />
      <div className="w-full flex-1">
        <DesktopView />
      </div>
    </div>
  );
}
