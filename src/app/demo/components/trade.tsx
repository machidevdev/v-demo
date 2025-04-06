"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { atom, useAtom } from "jotai";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
type TradeSettings = {
  margin: "isolated" | "cross";
  leverage: number;
};

const tradeSettingsAtom = atom<TradeSettings>({
  margin: "isolated",
  leverage: 10,
});

const tradeDirectionAtom = atom<"long" | "short">("long");

const TradeSettings = () => {
  const [tradeSettings, setTradeSettings] = useAtom(tradeSettingsAtom);

  return <div className="grid grid-cols-3"></div>;
};

const TradeSettingsComponent = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="outline">hello</Button>
      <Button variant="outline">hello</Button>
      <Button disabled variant="outline">
        hello
      </Button>
    </div>
  );
};

const TradeType = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="ghost" className="flex items-center justify-center">
        Market
      </Button>
      <Button variant="ghost" className="flex items-center justify-center">
        Limit
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">Pro</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Pro</DropdownMenuItem>
          <DropdownMenuItem>Pro</DropdownMenuItem>
          <DropdownMenuItem>Pro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const TradeForm = () => {
  const [tradeDirection, setTradeDirection] = useAtom(tradeDirectionAtom);
  return (
    <div className="flex flex-row justify-around gap-2">
      <Button
        className={cn(
          "w-full border border-green-500 bg-transparent text-foreground transition-all duration-300 hover:bg-green-500",
          tradeDirection === "long" && "bg-green-500 text-white",
        )}
        onClick={() => setTradeDirection("long")}
      >
        long
      </Button>
      <Button
        className={cn(
          "w-full border border-red-500 bg-transparent text-foreground transition-all duration-300 hover:bg-red-500",
          tradeDirection === "short" && "bg-red-500 text-white",
        )}
        onClick={() => setTradeDirection("short")}
      >
        short
      </Button>
    </div>
  );
};

export const Trade = () => {
  return (
    <Card className="flex h-full flex-col p-2">
      <CardContent className="flex flex-col gap-2">
        <TradeSettingsComponent />
        <TradeType />
        <TradeForm />
        <div className="flex flex-row justify-between text-xs text-muted-foreground">
          <div>Available Balance</div>

          <div className="">100</div>
        </div>
        <div className="flex flex-row justify-between text-xs text-muted-foreground">
          <div>Current Position</div>

          <div className="">100</div>
        </div>
        <div className="relative">
          <Input className="w-full" />
          <div className="absolute right-0 top-0 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="uppercase">
                  Btc
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Btc</DropdownMenuItem>
                <DropdownMenuItem>Btc</DropdownMenuItem>
                <DropdownMenuItem>Btc</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Slider defaultValue={[0]} max={100} min={0} step={1} />
      </CardContent>
    </Card>
  );
};
