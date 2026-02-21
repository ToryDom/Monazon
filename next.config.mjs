/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Dependencias opcionales de MetaMask SDK y WalletConnect que no usamos en web
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    }
    return config
  },
}

export default nextConfig
