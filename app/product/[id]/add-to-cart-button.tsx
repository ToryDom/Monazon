"use client"

import { useCart } from "@/components/cart-context"
import type { Product } from "@/lib/products"

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="mt-4 w-full rounded-xl bg-purple-600 py-4 text-lg font-semibold text-white hover:bg-purple-500 transition"
    >
      Agregar al carrito 🛒
    </button>
  )
}
