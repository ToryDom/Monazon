"use client"

import Link from "next/link"
import { useCart } from "@/components/cart-context"
import type { Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group rounded-2xl border border-purple-900/20 bg-[#12121a] overflow-hidden hover:border-purple-600/50 transition-all hover:shadow-lg hover:shadow-purple-900/20">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-[#1e1e2e]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-white group-hover:text-purple-400 transition">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</span>
          <span className="text-neutral-500">({product.reviews.toLocaleString("es")})</span>
        </div>
        <p className="text-xs text-neutral-500 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-purple-400">{product.price} MON</span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 transition"
          >
            Agregar 🛒
          </button>
        </div>
      </div>
    </div>
  )
}
