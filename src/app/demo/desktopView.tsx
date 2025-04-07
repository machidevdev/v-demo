"use client";

import OrderBook from "./components/orderbook";
import { Trade } from "./components/trade";
import Positions from "./components/positions";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import TradeHistory from "./components/tradeHistory";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const ResponsiveGridLayout = WidthProvider(Responsive);

const l1 = [
  { i: "graph", x: 0, y: 0, w: 4, h: 15 },
  { i: "orderbook", x: 4, y: 0, w: 3, h: 15 },
  { i: "history", x: 7, y: 0, w: 2, h: 15 },
  { i: "trade", x: 9, y: 0, w: 3, h: 15 },
  { i: "positions", x: 0, y: 18, w: 12, h: 5 },
];

const md = [
  { i: "graph", x: 0, y: 0, w: 5, h: 15 },
  { i: "orderbook", x: 5, y: 0, w: 4, h: 15 },
  { i: "history", x: 9, y: 15, w: 1, h: 15 },
  { i: "trade", x: 0, y: 0, w: 5, h: 15 },
  { i: "positions", x: 5, y: 0, w: 5, h: 1 },
];

const sm = [
  { i: "graph", x: 0, y: 0, w: 6, h: 10, static: true },
  { i: "orderbook", x: 0, y: 10, w: 6, h: 10, static: true },
  { i: "history", x: 0, y: 20, w: 6, h: 10, static: true },
  { i: "trade", x: 0, y: 30, w: 6, h: 10, static: true },
  { i: "positions", x: 0, y: 40, w: 6, h: 10, static: true },
];

export default function DesktopView() {
  useEffect(() => {
    const handleDragStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".react-grid-item")) {
        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";
      }
    };

    const handleDragEnd = () => {
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    };

    document.addEventListener("mousedown", handleDragStart);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("dragend", handleDragEnd);

    return () => {
      document.removeEventListener("mousedown", handleDragStart);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  return (
    <ResponsiveGridLayout
      autoSize={true}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      layouts={{ lg: l1, md: md, sm: sm }}
      rowHeight={30}
      draggableHandle=".drag-handle"
      resizeHandles={["se"]}
    >
      <div key="graph" className="h-full">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Graph</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div key="orderbook">
        <OrderBook />
      </div>
      <div key="history">
        <TradeHistory />
      </div>
      <div key="trade" className="h-full">
        <div className="drag-handle" />
        <Trade />
      </div>
      <div key="positions" className="h-full">
        <div className="drag-handle" />
        <Positions />
      </div>
    </ResponsiveGridLayout>
  );
}
