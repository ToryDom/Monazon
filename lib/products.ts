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
    id: "bajo-epiphone",
    name: "Bajo Epiphone",
    description:
      "Bajo eléctrico Epiphone, sonido potente y definido. Ideal para estudio y directo. Cuerpo de caoba, mástil cómodo y electrónica versátil para rock, funk o jazz.",
    price: 0.18,
    image: "/productos/bajo-epiphone.png",
    category: "Instrumentos",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "laptop",
    name: "Laptop",
    description:
      "Laptop para trabajo y estudio. Pantalla nítida, buen rendimiento y batería de larga duración. Perfecta para programar, diseñar o navegar.",
    price: 0.35,
    image: "/productos/Laptop.png",
    category: "Tecnología",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "microondas",
    name: "Microondas",
    description:
      "Microondas de capacidad amplia, con grill y descongelado rápido. Fácil de usar y limpiar. Ahorra tiempo en la cocina todos los días.",
    price: 0.06,
    image: "/productos/Microondas.png",
    category: "Electrodomésticos",
    rating: 4.5,
    reviews: 234,
  },
  {
    id: "ninja",
    name: "Ninja",
    description:
      "Licuadora o procesador Ninja, potencia profesional en tu cocina. Para smoothies, sopas, picar hielo y más. Diseño robusto y fácil de lavar.",
    price: 0.12,
    image: "/productos/Ninja.png",
    category: "Electrodomésticos",
    rating: 4.8,
    reviews: 412,
  },
  {
    id: "yamaha",
    name: "Yamaha",
    description:
      "Producto Yamaha: calidad y sonido reconocidos. Ya sea instrumento musical, equipo de audio o moto, rendimiento confiable y durabilidad.",
    price: 0.22,
    image: "/productos/Yamaha.png",
    category: "Instrumentos",
    rating: 4.9,
    reviews: 278,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
