"use client"

import { createContext, useContext, useState, useCallback } from "react"
import type { Product } from "@/lib/products"

interface CartItem {
  product: Product
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  toggleCart: () => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextValue>({
  items: [],
  isOpen: false,
  toggleCart: () => {},
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  total: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, toggleCart, addItem, removeItem, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
