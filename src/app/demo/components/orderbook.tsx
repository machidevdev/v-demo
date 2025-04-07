"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import useOrderBook from "@/hooks/useOrderBook";
import { type BookLevel } from "@nktkas/hyperliquid";
import { cn } from "@/lib/utils";
import { atom, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
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
            "relative flex h-6 flex-row items-center justify-between p-2 hover:cursor-pointer hover:font-bold",
            side === "ask" && "text-red-500",
            side === "bid" && "text-green-500",
          )}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            initial={{ opacity: 0 }}
            animate={{
              width:
                currentMaxSize === 0
                  ? "0%"
                  : `${(Number(item.sz) / currentMaxSize) * 100}%`,
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

const OrderBookSkeleton = () => {
  return (
    <div className="flex min-h-0 w-full flex-col">
      <div className="flex h-1/2 min-h-0 flex-col-reverse gap-1 overflow-y-hidden p-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="flex min-h-4 w-full" />
        ))}
      </div>
      <div className="flex w-full justify-center py-2">
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex h-1/2 min-h-0 flex-col gap-1 p-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton key={i} className="flex min-h-4 w-full" />
        ))}
      </div>
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
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="">
        <div>Order book</div>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-40px)] w-full overflow-hidden">
        {isLoading ? (
          <OrderBookSkeleton />
        ) : (
          <div className="flex h-full min-h-0 w-full flex-col">
            <div className="flex h-1/2 min-h-0 overflow-hidden">
              <OrderBookSide data={data?.levels[0].slice(0, 15)} side="ask" />
            </div>
            <div className="mx-2 flex w-full justify-center py-1 text-xs text-muted-foreground">
              SPREAD: 1
            </div>
            <div className="flex h-1/2 min-h-0 overflow-hidden">
              <OrderBookSide data={data?.levels[1].slice(0, 15)} side="bid" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
