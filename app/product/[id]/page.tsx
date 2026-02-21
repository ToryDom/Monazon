import { notFound } from "next/navigation"
import { getProductById, products } from "@/lib/products"
import { Navbar } from "@/components/navbar"
import { AddToCartButton } from "./add-to-cart-button"

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="aspect-square overflow-hidden rounded-2xl border border-purple-900/20 bg-[#1e1e2e]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <span className="text-sm text-purple-400 font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">{"★".repeat(Math.round(product.rating))}</span>
              <span className="text-neutral-500 text-sm">{product.rating} ({product.reviews.toLocaleString("es")} reseñas)</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">{product.description}</p>
            <div className="pt-4">
              <p className="text-3xl font-bold text-purple-400">{product.price} MON</p>
              <p className="text-sm text-neutral-500 mt-1">Pago en Monad Testnet</p>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </main>
    </div>
  )
}
