"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import useOrderBook from "@/hooks/useOrderBook";
import { type BookLevel } from "@nktkas/hyperliquid";
import { cn } from "@/lib/utils";
import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { motion } from "motion/react";
const maxSize = atom<number>(0);

interface OrderBookSideProps {
  data: BookLevel[] | undefined;
  side: "bid" | "ask";
}

const OrderBookSide = ({ data, side }: OrderBookSideProps) => {
  const [currentMaxSize] = useAtom(maxSize);
  return (
    <div
      className={cn("flex h-full min-h-0 w-full flex-col overflow-hidden", {
        "flex-col-reverse": side === "ask",
      })}
    >
      {data?.map((item) => (
        <div
          key={item.px}
          className={cn(
            "relative flex h-6 flex-row items-center justify-between p-2",
            side === "ask" && "text-red-500",
            side === "bid" && "text-green-500",
          )}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            initial={{ opacity: 0 }}
            animate={{
              width: `${(Number(item.sz) / currentMaxSize) * 100}%`,
              backgroundColor:
                side === "ask" ? "rgb(239 68 68)" : "rgb(34 197 94)",
              opacity: 0.2,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
          <div className="z-10">{item.px}</div>
          <div className="z-10">{item.sz}</div>
        </div>
      ))}
    </div>
  );
};

export default function OrderBook() {
  const { data, isLoading } = useOrderBook();
  const setMaxSize = useSetAtom(maxSize);

  useEffect(() => {
    if (data?.levels[1]) {
      const maxBid = Math.max(
        ...data.levels[1].map((level) => Number(level.sz)),
      );
      const maxAsk = Math.max(
        ...data.levels[0].map((level) => Number(level.sz)),
      );
      if (maxAsk > maxBid) {
        setMaxSize(maxAsk);
      } else {
        setMaxSize(maxBid);
      }
    }
  }, [data, setMaxSize]);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <div>ORDERBOOK</div>
      </CardHeader>
      <CardContent className="flex h-full w-full">
        <div className="flex h-full min-h-0 w-full flex-col">
          <div className="flex h-1/2 min-h-0">
            <OrderBookSide data={data?.levels[0].slice(0, 15)} side="ask" />
          </div>
          <div className="flex w-full">Spread: 1</div>
          <div className="flex h-1/2 min-h-0">
            <OrderBookSide data={data?.levels[1].slice(0, 15)} side="bid" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
