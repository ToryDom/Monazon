"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"
import { config } from "@/lib/wagmi-config"
import { AddressProvider } from "@/contexts/address-context"
import { EnsureMonadTestnet } from "@/components/ensure-monad-testnet"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AddressProvider>
          <CartProvider>
            <EnsureMonadTestnet />
            <CartSidebar />
            {children}
          </CartProvider>
        </AddressProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
