import { useEffect } from "react";
import * as hl from "@nktkas/hyperliquid";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getOrderbook = async () => {
  const httpTransport = new hl.HttpTransport();
  const client = new hl.PublicClient({ transport: httpTransport });

  const book = await client.l2Book({
    coin: "BTC",
  });

  return book;
};

const useOrderBook = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orderbook", "BTC"],
    queryFn: getOrderbook,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const wsTransport = new hl.WebSocketTransport();
    const client = new hl.EventClient({ transport: wsTransport });

    client
      .l2Book(
        {
          coin: "BTC",
        },
        (data) => {
          queryClient.setQueryData(["orderbook", "BTC"], data);
        },
      )
      .catch(console.error);

    return () => {
      wsTransport.close().catch(console.error);
    };
  }, []);

  return { data, isLoading };
};

export default useOrderBook;
