# 1. lib/chain.ts
cat > lib/chain.ts << 'EOF'
export { monadTestnet } from "viem/chains"

export const USDC_ADDRESS = "0x754704Bc059F8C67012fEd69BC8A327a5aafb603" as const
export const USDC_DECIMALS = 6

export const ERC20_ABI = [
{
inputs: [{ name: "account", type: "address" }],
name: "balanceOf",

  outputs: [{ name: "", type: "uint256" }],
stateMutability: "view",
type: "function",
},
{
inputs: [
{ name: "to", type: "address" },
{ name: "amount", type: "uint256" },
],
name: "transfer",
outputs: [{ name: "", type: "bool" }],
stateMutability: "nonpayable",
type: "function",
},
] as const

EOF

# 2. lib/wagmi-config.ts
cat > lib/wagmi-config.ts << 'EOF'
import { http, createConfig } from "wagmi"
import { injected } from "wagmi/connectors"
import { monadTestnet } from "viem/chains"

export const config = createConfig({
chains: [monadTestnet],
connectors: [injected()],
transports: {
[monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
},
})
declare module "wagmi" {
interface Register {
config: typeof config
}
}
EOF

# 3. components/pay-button.tsx
cat > components/pay-button.tsx << 'EOF'
"use client"

import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { monadTestnet } from "viem/chains"

import { USDC_ADDRESS, ERC20_ABI } from "@/lib/chain"

interface PayButtonProps {
sellerAddress: string
amountRaw: string
amountFormatted: number
}

export function PayButton({ sellerAddress, amountRaw, amountFormatted }: PayButtonProps) {
const { address, isConnected } = useAccount()
const [successTx, setSuccessTx] = useState<string | null>(null)

const { writeContract, data: hash, isPending } = useWriteContract()
const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

useEffect(() => {
if (hash && isConfirmed) setSuccessTx(hash)
}, [hash, isConfirmed])

function handlePay() {
setSuccessTx(null)
writeContract({
address: USDC_ADDRESS,
abi: ERC20_ABI,
functionName: "transfer",
args: [sellerAddress as `0x${string}`, BigInt(amountRaw)],
chainId: monadTestnet.id,
})
}
  if (successTx || (hash && !isPending && !isConfirming)) {
const txHash = successTx ?? hash
const explorerUrl = `${monadTestnet.blockExplorers.default.url}/tx/${txHash}`
return (
<div className="rounded-lg bg-green-900/30 border border-green-700/50 p-4 text-center">
<p className="font-medium text-green-400">Pago confirmado</p>
<a href={explorerUrl} target="_blank" rel="noopener noreferrer"
className="mt-2 inline-block text-sm text-indigo-400 hover:underline">
Ver en explorador →
</a>
</div>
)
}

if (!isConnected || !address) {
  return (
<p className="rounded-lg border border-amber-700/50 bg-amber-900/20 py-3 text-center text-sm text-amber-200">
Conecta tu wallet para pagar
</p>
)
}

const loading = isPending || isConfirming

return (
<button type="button" onClick={handlePay} disabled={loading}
className="w-full rounded-lg bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50">
{loading ? "Esperando confirmación..." : `Pagar ${amountFormatted.toLocaleString("es")} USDC`}
</button>
)
  }
EOF

# 4. Commit y push
git add lib/chain.ts lib/wagmi-config.ts components/pay-button.tsx
git commit -m "fix: corregir chain a testnet en toda la app"
git push
