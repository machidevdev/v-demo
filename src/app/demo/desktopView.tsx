"use client";
import { ResizableHandle } from "@/components/ui/resizable";

import { ResizablePanelGroup } from "@/components/ui/resizable";

import { ResizablePanel } from "@/components/ui/resizable";
import OrderBook from "./components/orderbook";
import { Trade } from "./components/trade";
import Positions from "./components/positions";
import { Responsive, WidthProvider } from "react-grid-layout";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ResponsiveGridLayout = WidthProvider(Responsive);

const l1 = [
  { i: "graph", x: 0, y: 0, w: 4, h: 15 },
  { i: "orderbook", x: 4, y: 0, w: 4, h: 15 },
  { i: "history", x: 8, y: 0, w: 1, h: 15 },
  { i: "trade", x: 9, y: 0, w: 3, h: 15 },
  { i: "positions", x: 0, y: 15, w: 12, h: 15 },
];

const md = [
  { i: "graph", x: 0, y: 0, w: 5, h: 15 },
  { i: "orderbook", x: 5, y: 0, w: 4, h: 15 },
  { i: "history", x: 9, y: 15, w: 1, h: 15 },
  { i: "trade", x: 0, y: 0, w: 5, h: 15 },
  { i: "positions", x: 5, y: 0, w: 5, h: 15 },
];

const sm = [
  { i: "graph", x: 0, y: 0, w: 6, h: 15 },
  { i: "orderbook", x: 0, y: 0, w: 3, h: 15 },
  { i: "history", x: 3, y: 0, w: 3, h: 15 },
  { i: "trade", x: 0, y: 0, w: 10, h: 10 },
  { i: "positions", x: 0, y: 0, w: 10, h: 15 },
];

export default function DesktopView() {
  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      layouts={{ lg: l1, md: md, sm: sm }}
      rowHeight={30}
    >
      <div key="graph" className="h-full border">
        graph
      </div>
      <div key="orderbook" className="h-full">
        <OrderBook />
      </div>
      <div key="history" className="h-full">
        History
      </div>
      <div key="trade" className="h-full">
        <Trade />
      </div>
      <div key="positions" className="h-full">
        <Positions />
      </div>
    </ResponsiveGridLayout>
  );
}
