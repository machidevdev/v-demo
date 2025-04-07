import Navbar from "./demo/components/navbar";
import TickerBar from "./demo/components/tickerBar";
import DesktopView from "./demo/desktopView";
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
