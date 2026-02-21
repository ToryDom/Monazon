export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
}

export const products: Product[] = [
  {
    id: "nft-hoodie",
    name: "Monad Developer Hoodie",
    description: "Hoodie premium para builders de Monad. 100% algodón orgánico con logo bordado. Perfecto para hackathons y noches de coding.",
    price: 0.05,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Hoodie+Dev",
    category: "Ropa",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "hardware-wallet",
    name: "Ledger Nano S Plus",
    description: "Hardware wallet para almacenar tus MON y tokens de forma segura. Compatible con Monad.",
    price: 0.15,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Ledger+Nano",
    category: "Hardware",
    rating: 4.9,
    reviews: 2891,
  },
  {
    id: "mech-keyboard",
    name: "Teclado Mecánico RGB",
    description: "Teclado mecánico con switches Cherry MX, retroiluminación púrpura personalizable. El arma de todo dev.",
    price: 0.08,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Teclado+RGB",
    category: "Hardware",
    rating: 4.6,
    reviews: 567,
  },
  {
    id: "monad-stickers",
    name: "Pack Stickers Monad",
    description: "Pack de 50 stickers holográficos del ecosistema Monad. Decora tu laptop como un true degen.",
    price: 0.01,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Stickers",
    category: "Accesorios",
    rating: 4.7,
    reviews: 843,
  },
  {
    id: "dev-backpack",
    name: "Backpack Anti-robo Web3",
    description: "Mochila con carga USB, compartimento para laptop 15\" y bolsillo oculto para tu seed phrase (en papel, obvio).",
    price: 0.1,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Backpack",
    category: "Accesorios",
    rating: 4.5,
    reviews: 312,
  },
  {
    id: "monitor-4k",
    name: "Monitor 4K 27\" Ultra",
    description: "Monitor 4K IPS para ver tus charts y tu código en máxima resolución. Modo oscuro por defecto.",
    price: 0.25,
    image: "https://placehold.co/400x400/1e1e2e/836EF9?text=Monitor+4K",
    category: "Hardware",
    rating: 4.8,
    reviews: 1205,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
