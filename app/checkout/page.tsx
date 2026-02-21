"use client"

import { Navbar } from "@/components/navbar"
import { useCart } from "@/components/cart-context"
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { ConnectWallet } from "@/components/connect-wallet"
import { useState, useEffect } from "react"

const MONAD_TESTNET_CHAIN_ID = 10143
const VENDOR_ADDRESS = "0x4FE25A00a1CF408fe7e5f8bf2E48336a935f4Ec9" as const
const EXPLORER_URL = "https://testnet.monadscan.com"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const { address, isConnected } = useAccount()
  const [confirmedHash, setConfirmedHash] = useState<string | null>(null)

  const { sendTransactionAsync, data: hash, isPending } = useSendTransaction()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (hash && isSuccess) {
      setConfirmedHash(hash)
      clearCart()
    }
  }, [hash, isSuccess, clearCart])

  async function handlePay() {
    setConfirmedHash(null)
    const value = parseEther(total.toFixed(18))
    await sendTransactionAsync({
      to: VENDOR_ADDRESS,
      value,
      chainId: MONAD_TESTNET_CHAIN_ID,
    })
  }

  const loading = isPending || isConfirming
  const txHash = confirmedHash ?? hash

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

        {txHash && !loading ? (
          <div className="rounded-2xl border border-green-700/50 bg-green-900/20 p-8 text-center space-y-4">
            <p className="text-4xl">✅</p>
            <p className="text-xl font-semibold text-green-400">¡Pago confirmado!</p>
            <a
              href={`${EXPLORER_URL}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-purple-400 hover:underline"
            >
              Ver transacción en explorador →
            </a>
          </div>
        ) : items.length === 0 && !txHash ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">Tu carrito está vacío</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-purple-900/20 bg-[#12121a] p-6 space-y-4">
              <h2 className="font-semibold text-white">Resumen del pedido</h2>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-neutral-300">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="text-purple-400">
                    {(item.product.price * item.quantity).toFixed(4)} MON
                  </span>
                </div>
              ))}
              <div className="border-t border-purple-900/30 pt-3 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="text-xl font-bold text-purple-400">{total.toFixed(4)} MON</span>
              </div>
            </div>

            {!isConnected ? (
              <div className="rounded-xl border border-amber-700/50 bg-amber-900/20 p-6 text-center space-y-3">
                <p className="text-amber-200">Conecta tu wallet para pagar</p>
                <ConnectWallet />
              </div>
            ) : (
              <button
                type="button"
                onClick={handlePay}
                disabled={loading}
                className="w-full rounded-xl bg-purple-600 py-4 text-lg font-semibold text-white hover:bg-purple-500 disabled:opacity-50 transition"
              >
                {loading ? "Procesando pago..." : `Pagar ${total.toFixed(4)} MON`}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
