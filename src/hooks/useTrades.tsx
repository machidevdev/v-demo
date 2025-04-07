import { useEffect } from "react";
import * as hl from "@nktkas/hyperliquid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getTrades = async (): Promise<hl.WsTrade[]> => {
  return [];
};

const useTrades = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["trades", "BTC"],
    queryFn: getTrades,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const wsTransport = new hl.WebSocketTransport();
    const client = new hl.EventClient({ transport: wsTransport });

    client
      .trades(
        {
          coin: "BTC",
        },
        (data) => {
          queryClient.setQueryData(["trades", "BTC"], (old: hl.WsTrade[]) => {
            const existingIds = new Set(old?.map((trade) => trade.tid) || []);
            const newTrades = data.filter(
              (trade) => !existingIds.has(trade.tid),
            );
            return [...newTrades, ...(old || [])].slice(0, 18);
          });
        },
      )
      .catch(console.error);

    return () => {
      wsTransport.close().catch(console.error);
    };
  }, [queryClient]);

  return { data, isLoading };
};

export { useTrades };
