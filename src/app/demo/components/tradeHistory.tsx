"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrades } from "@/hooks/useTrades";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <CardHeader className="pt-3">
        <div>Trade History</div>
      </CardHeader>
      <CardContent className="flex min-h-0 w-full overflow-hidden">
        {isLoading || data?.length === 0 ? (
          <TradeHistorySkeleton />
        ) : (
          <div className="flex h-full min-h-0 w-full flex-col gap-1 p-2">
            <Table>
              <TableHeader className="p-0">
                <TableRow className="p-0">
                  <TableHead className="text-left">Coin</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {limitedTrades.map((trade) => (
                    <motion.tr
                      key={trade.tid}
                      initial={{ opacity: 0.8, x: 2 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <TableCell
                        className={cn(
                          "truncate",
                          trade.side === "B" ? "text-success" : "text-error",
                        )}
                      >
                        {trade.coin}
                      </TableCell>
                      <TableCell className="truncate text-right text-muted-foreground">
                        {trade.px}
                      </TableCell>
                      <TableCell className="truncate text-right text-muted-foreground">
                        {trade.sz}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradeHistory;
