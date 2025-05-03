'use client'

import { useEffect, useState } from 'react'

import type { PriceState, UseRbtcUsdPriceOptions } from '@/lib/types/hooks'

/* -------------------------------------------------------------------------- */
/*                             RBTC → USD  P R I C E                          */
/* -------------------------------------------------------------------------- *
 * The Rootstock network’s native token is RBTC.  For a lightweight client-
 * side price feed we query CoinGecko’s "rootstock-smart-bitcoin” endpoint and
 * mark the reading stale once it exceeds the caller-supplied maxAgeMs.
 * In production you should replace this with an on-chain oracle read.
 * ------------------------------------------------------------------------- */

export function useRbtcUsdPrice(
  { maxAgeMs = 3_600_000 }: UseRbtcUsdPriceOptions = {},
): PriceState {
  const [state, setState] = useState<PriceState>({
    usd: null,
    stale: false,
    loading: true,
  })

  useEffect(() => {
    let staleTimer: NodeJS.Timeout

    async function fetchNow() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=rootstock-smart-bitcoin&vs_currencies=usd',
        )
        const json = await res.json()
        const usd = Number(json?.['rootstock-smart-bitcoin']?.usd ?? null)

        setState({ usd, stale: false, loading: false })

        /* mark stale after maxAgeMs ------------------------------------- */
        clearTimeout(staleTimer)
        staleTimer = setTimeout(
          () => setState((s) => ({ ...s, stale: true })),
          maxAgeMs,
        )
      } catch {
        setState({ usd: null, stale: true, loading: false })
      }
    }

    fetchNow()
    const id = setInterval(fetchNow, maxAgeMs)
    return () => {
      clearInterval(id)
      clearTimeout(staleTimer)
    }
  }, [maxAgeMs])

  return state
}