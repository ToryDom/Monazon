import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {/* Hero */}
        <div className="mb-10 rounded-2xl border border-purple-900/30 bg-gradient-to-r from-purple-900/30 via-[#12121a] to-purple-900/30 p-10 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Monazon
            </span>
          </h1>
          <p className="mt-3 text-neutral-400 text-lg">
            El marketplace de LATAM. Compra y paga con MON en Monad. 🚀
          </p>
        </div>

        {/* Categorías */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {["Todos", "Hardware", "Ropa", "Accesorios"].map((cat) => (
            <span
              key={cat}
              className="shrink-0 cursor-pointer rounded-full border border-purple-800/50 bg-purple-900/20 px-4 py-1.5 text-sm text-purple-300 hover:bg-purple-900/40 transition"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Grid de productos */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <footer className="border-t border-purple-900/30 py-6 text-center text-sm text-neutral-600">
        Monazon © 2025 — Powered by Monad
      </footer>
    </div>
  )
}
