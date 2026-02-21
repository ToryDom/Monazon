import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Monazon | Links de pago en USDC en Monad",
  description: "Genera links de pago y recibe stablecoins en Monad",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen antialiased bg-[#0a0a0f] text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
