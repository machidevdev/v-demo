// TradingViewWidget.jsx
import { Card, CardHeader } from "@/components/ui/card";
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Card
      className="tradingview-widget-container h-full w-full"
      ref={container}
    >
      <CardHeader />
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - px)", width: "100%" }}
      ></div>
    </Card>
  );
}

export default memo(TradingViewWidget);
