"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <h2 className="text-lg font-semibold text-white">Algo salió mal</h2>
      <p className="mt-2 text-center text-sm text-neutral-400">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Reintentar
      </button>
    </div>
  )
}
