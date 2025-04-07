"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrades } from "@/hooks/useTrades";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";

const MAX_TRADES = 50; // Maximum number of trades to display

const TradeHistory = () => {
  const { data, isLoading } = useTrades();

  // Limit the number of trades displayed
  const limitedTrades = useMemo(() => {
    if (!data) return [];
    return data.slice(0, MAX_TRADES);
  }, [data]);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <CardTitle>Trade History</CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-y-hidden">
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
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
