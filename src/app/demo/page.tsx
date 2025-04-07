import Navbar from "./components/navbar";
import TickerBar from "./components/tickerBar";

import DesktopView from "./desktopView";
export default function DemoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col border p-2">
      <Navbar />
      <TickerBar />
      <div className="w-full flex-1">
        <DesktopView />
      </div>
    </div>
  );
}
