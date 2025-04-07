"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrades } from "@/hooks/useTrades";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const MAX_TRADES = 50; // Maximum number of trades to display

const TradeHistorySkeleton = () => {
  return (
    <div className="space-y-2">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="grid grid-cols-3 gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="ml-auto h-4 w-16" />
        </div>
      ))}
    </div>
  );
};

const TradeHistory = () => {
  const { data, isLoading } = useTrades();

  // Limit the number of trades displayed
  const limitedTrades = useMemo(() => {
    if (!data) return [];
    return data.slice(0, MAX_TRADES);
  }, [data]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>Trade History</CardHeader>
      <CardContent className="h-full overflow-y-hidden">
        {isLoading || data?.length === 0 ? (
          <TradeHistorySkeleton />
        ) : (
          <div className="space-y-2 overflow-y-hidden">
            {limitedTrades.map((trade) => (
              <div
                key={trade.tid}
                className="grid grid-cols-3 gap-2 overflow-hidden text-sm"
              >
                <div
                  className={cn(
                    "truncate",
                    trade.side === "B" ? "text-green-500" : "text-red-500",
                  )}
                >
                  {trade.coin}
                </div>
                <div className="truncate text-muted-foreground">{trade.px}</div>
                <div className="truncate text-right text-muted-foreground">
                  {trade.sz}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
