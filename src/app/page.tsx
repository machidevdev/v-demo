import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <ConnectButton />

          <h1 className="text-2xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App -
            web3 ver.
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="block"
              href="https://ui.shadcn.com/docs"
              target="_blank"
            >
              <Card className="bg-white/10 text-white hover:bg-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Components →
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  Beautifully designed components built with Radix UI and
                  Tailwind CSS. Copy and paste into your apps.
                </CardContent>
              </Card>
            </Link>

            <Link
              className="block"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <Card className="bg-white/10 text-white hover:bg-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Documentation →
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </CardContent>
              </Card>
            </Link>
            <Link
              className="block"
              href="https://www.rainbowkit.com/docs/introduction"
              target="_blank"
            >
              <Card className="bg-white/10 text-white hover:bg-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    RainbowKit →
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  The best way to connect a wallet. Learn how to customize
                  wallet connection, theming, chains and more.
                </CardContent>
              </Card>
            </Link>
            <Link className="block" href="https://wagmi.sh/" target="_blank">
              <Card className="bg-white/10 text-white hover:bg-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Wagmi →</CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  React Hooks for Ethereum - featuring wallet connection,
                  contracts, transactions, signing and more.
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
