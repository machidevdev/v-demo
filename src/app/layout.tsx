import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/react";
import { WagmiClient } from "@/web3/wagmi-client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/app/demo/components/theme-provider";
export const metadata: Metadata = {
  title: "V-demo",
  description: "V-demo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={``}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <TooltipProvider>
            <WagmiClient>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </WagmiClient>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
