import { ResizableHandle } from "@/components/ui/resizable";

import { ResizablePanelGroup } from "@/components/ui/resizable";

import { ResizablePanel } from "@/components/ui/resizable";
import OrderBook from "./components/orderbook";

export default function MobileView() {
  return (
    <ResizablePanelGroup direction="vertical" className="flex h-full w-full">
      <ResizablePanel>
        <ResizablePanelGroup
          direction="horizontal"
          className="flex h-full w-full"
        >
          <ResizablePanel defaultSize={40} minSize={20} maxSize={60}>
            <div className="flex h-full w-full items-center justify-center">
              Chart
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
            <div className="h-full w-full">
              <OrderBook />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
            <div className="h-full w-full">History</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30} minSize={15} maxSize={40}>
            <div className="h-full w-full">Commands</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="h-full w-full">Positions</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
