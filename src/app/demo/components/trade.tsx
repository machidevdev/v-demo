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
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useAccount, useSignMessage } from "wagmi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import { motion } from "motion/react";
import { useState } from "react";
type TradeSettings = {
  margin: "isolated" | "cross";
  leverage: number;
};

const tradeSettingsAtom = atom<TradeSettings>({
  margin: "isolated",
  leverage: 10,
});

const proOptions = [
  {
    label: "Pro",
    value: "pro",
  },
  {
    label: "Pro1",
    value: "pro1",
  },
  {
    label: "Pro2",
    value: "pro2",
  },
] as const;
type ProOption = (typeof proOptions)[number];
const proOptionsAtom = atom<ProOption>(proOptions[0]);
const tradeAmountAtom = atom<number>(0);
const balanceAtom = atom<number>(100);
const tradeDirectionAtom = atom<"long" | "short">("long");

const TradeSettings = () => {
  const [tradeSettings, setTradeSettings] = useAtom(tradeSettingsAtom);

  return <div className="grid grid-cols-3"></div>;
};

const TradeSettingsComponent = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="outline" className="lowercase">
        isolated
      </Button>
      <Button variant="outline">
        <Dialog>
          <DialogTrigger asChild className="h-full w-full">
            <div className="w-ful">Limit</div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Limit</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Button>

      <Button disabled variant="outline">
        hello
      </Button>
    </div>
  );
};

const TradeType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useAtom(proOptionsAtom);
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button variant="ghost" className="flex items-center justify-center">
        Market
      </Button>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center justify-center">
            <div>{selectedOption.label}</div>
            <ChevronDown
              className={cn(
                isOpen && "rotate-180",
                "transition-all duration-300",
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {proOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSelectedOption(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const TradeButton = () => {
  const { signMessage, isPending } = useSignMessage();
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  if (!address) {
    return (
      <Button variant="outline" onClick={() => openConnectModal?.()}>
        Connect
      </Button>
    );
  }

  const handleTrade = async () => {
    const signature = signMessage(
      { message: "trade" },
      {
        onSuccess: (data) => {
          toast.success("Trade signed");
        },
        onError: (error) => {
          toast.error("Trade failed");
        },
      },
    );
    console.log(signature);
  };

  return (
    <Button
      className={cn(
        "border border-green-500 bg-transparent text-foreground hover:bg-green-500/80",
        isPending && "animate-pulse",
      )}
      disabled={isPending}
      onClick={handleTrade}
    >
      <div className="flex flex-row gap-2 uppercase">
        <div>{isPending ? "Signing..." : "Trade"}</div>
      </div>
    </Button>
  );
};
const TradeForm = () => {
  const [tradeDirection, setTradeDirection] = useAtom(tradeDirectionAtom);
  return (
    <div className="flex flex-row justify-around gap-2">
      <Button
        className={cn(
          "w-full border border-green-500 bg-transparent text-foreground transition-all duration-200 ease-in-out hover:bg-green-500/10",
          tradeDirection === "long" &&
            "bg-green-500 text-white hover:bg-green-600",
        )}
        onClick={() => setTradeDirection("long")}
      >
        long
      </Button>
      <Button
        className={cn(
          "w-full border border-red-500 bg-transparent text-foreground transition-all duration-200 ease-in-out hover:bg-red-500/10",
          tradeDirection === "short" &&
            "bg-red-500 text-white hover:bg-red-600",
        )}
        onClick={() => setTradeDirection("short")}
      >
        short
      </Button>
    </div>
  );
};

export const Trade = () => {
  const [tradeAmount, setTradeAmount] = useAtom(tradeAmountAtom);
  const [balance, setBalance] = useAtom(balanceAtom);
  return (
    <Card className="flex h-full flex-col p-2">
      <CardContent className="flex flex-col gap-2">
        <TradeSettingsComponent />
        <TradeType />
        <TradeForm />
        <div className="flex flex-row justify-between text-xs text-muted-foreground">
          <div>Available Balance</div>
          <div>{balance}</div>
        </div>
        <div className="flex flex-row justify-between text-xs text-muted-foreground">
          <div>Current Position</div>

          <div className="">{tradeAmount}</div>
        </div>
        <div className="relative">
          <Input
            className="w-full pr-16"
            type="number"
            onChange={(e) => setTradeAmount(Number(e.target.value))}
            max={balance}
            value={tradeAmount}
          />
          <div className="absolute right-0 top-0 z-20 w-16">
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
        <Slider
          defaultValue={[0]}
          max={100}
          min={0}
          step={1}
          value={[(tradeAmount / balance) * 100]}
          onValueChange={(value) =>
            setTradeAmount(
              Number((((value[0] ?? 0) / 100) * balance).toFixed(0)),
            )
          }
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group flex text-xs text-muted-foreground">
              <div className="border-b border-dashed border-muted-foreground pb-1 transition-all duration-300 group-hover:cursor-help group-hover:border-foreground group-hover:text-foreground">
                Example tooltip
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="start" className="flex">
            <p className="flex">Example tooltip</p>
          </TooltipContent>
        </Tooltip>
        <TradeButton />
      </CardContent>
    </Card>
  );
};
