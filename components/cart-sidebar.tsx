"use client"

import { useCart } from "@/components/cart-context"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, total } = useCart()
  const router = useRouter()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={toggleCart} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-purple-900/30 bg-[#12121a] shadow-2xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-purple-900/30 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">🛒 Tu carrito</h2>
            <button
              type="button"
              onClick={toggleCart}
              className="text-neutral-400 hover:text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <p className="text-center text-neutral-500 mt-10">Tu carrito está vacío</p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-4 rounded-xl border border-purple-900/20 bg-purple-900/10 p-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.product.name}</p>
                      <p className="text-sm text-purple-400">{item.product.price} MON × {item.quantity}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-neutral-500 hover:text-red-400 text-sm"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-purple-900/30 px-6 py-4 space-y-3">
              <div className="flex justify-between text-white">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold text-purple-400">{total.toFixed(4)} MON</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleCart()
                  router.push("/checkout")
                }}
                className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-500 transition"
              >
                Ir a pagar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
