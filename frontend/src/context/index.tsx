import React, { ReactNode } from "react";
import { WagmiProvider, cookieToInitialState } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { wagmiAdapter, queryClient } from "@/config";

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies?: string;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies);

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
