import { useEffect } from "react";
import * as hl from "@nktkas/hyperliquid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const getOrderbook = async () => {
  const httpTransport = new hl.HttpTransport();
  const client = new hl.PublicClient({ transport: httpTransport });

  const book = await client.l2Book({
    coin: "BTC",
  });

  return book;
};

const useOrderBook = (n: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderbook", "BTC"],
    queryFn: getOrderbook,
  });

  const queryClient = useQueryClient();
  const effectiveN = n == 1 ? 1 : n == 2 ? 2 : n == 3 ? 3 : n == 4 ? 4 : 5;
  useEffect(() => {
    const wsTransport = new hl.WebSocketTransport();
    const client = new hl.EventClient({ transport: wsTransport });
    client
      .l2Book(
        {
          coin: "BTC",
          nSigFigs: effectiveN == 1 ? null : effectiveN,
        },
        (data) => {
          queryClient.setQueryData(["orderbook", "BTC"], data);
        },
      )
      .catch(console.error);

    return () => {
      wsTransport.close().catch(console.error);
    };
  }, [queryClient, effectiveN]);

  return { data, isLoading };
};

export default useOrderBook;
