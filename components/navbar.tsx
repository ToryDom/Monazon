"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { ConnectWallet } from "@/components/connect-wallet"
import { useCart } from "@/components/cart-context"

export function Navbar() {
  const { items, toggleCart } = useCart()
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-purple-900/30 bg-[#0a0a0f]/95 backdrop-blur-md px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="text-xl" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm text-neutral-400 hover:text-purple-400 transition">
            Productos
          </Link>
          <Link href="/dashboard" className="text-sm text-neutral-400 hover:text-purple-400 transition">
            Vendedor
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleCart}
            className="relative rounded-lg border border-purple-800/50 bg-purple-900/20 px-3 py-2 text-sm text-purple-300 hover:bg-purple-900/40 transition"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
