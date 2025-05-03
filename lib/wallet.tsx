'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef } from 'react'

import { getDefaultConfig, RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { WagmiProvider, http, useAccount, useChainId } from 'wagmi'

import { WALLETCONNECT_PROJECT_ID } from './config'

/* -------------------------------------------------------------------------- */
/*                                    CHAINS                                  */
/* -------------------------------------------------------------------------- */

export const rootstockMain = {
  id: 30,
  name: 'Rootstock',
  nativeCurrency: { name: 'Rootstock Bitcoin', symbol: 'RBTC', decimals: 18 },
  rpcUrls: { default: { http: ['https://public-node.rsk.co'] } },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.rsk.co' },
  },
  testnet: false,
} as const

export const rootstockTest = {
  id: 31,
  name: 'Rootstock Testnet',
  nativeCurrency: { name: 'Testnet RBTC', symbol: 'tRBTC', decimals: 18 },
  rpcUrls: { default: { http: ['https://public-node.testnet.rsk.co'] } },
  blockExplorers: {
    default: { name: 'RSK Explorer Testnet', url: 'https://explorer.testnet.rsk.co' },
  },
  testnet: true,
} as const

/* -------------------------------------------------------------------------- */
/*                       R A I N B O W   K I T / W A G M I                    */
/* -------------------------------------------------------------------------- */

const wagmiConfig = getDefaultConfig({
  appName: 'HireStamp',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [rootstockMain, rootstockTest],
  transports: {
    [rootstockMain.id]: http(rootstockMain.rpcUrls.default.http[0]),
    [rootstockTest.id]: http(rootstockTest.rpcUrls.default.http[0]),
  },
  ssr: true,
})

const queryClient = new QueryClient()

/* -------------------------------------------------------------------------- */
/*                 W A L L E T   &   S E S S I O N   L I S T E N E R          */
/* -------------------------------------------------------------------------- */

function WalletConnectionListener() {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const correctNetwork = chainId === rootstockMain.id || chainId === rootstockTest.id
  const router = useRouter()
  const pathname = usePathname()

  const prevConnected = useRef(isConnected && correctNetwork)

  const sessionFlagKey = address ? `hs_session_${address}` : undefined
  const sessionAlreadyEnsured = () =>
    typeof window !== 'undefined' && sessionFlagKey
      ? sessionStorage.getItem(sessionFlagKey) === '1'
      : false
  const markSessionEnsured = () => {
    if (typeof window !== 'undefined' && sessionFlagKey) {
      sessionStorage.setItem(sessionFlagKey, '1')
    }
  }
  const clearSessionFlag = () => {
    if (typeof window !== 'undefined' && sessionFlagKey) {
      sessionStorage.removeItem(sessionFlagKey)
    }
  }

  /* Disconnect or wrong network → clear session & redirect */
  useEffect(() => {
    const connectedAndCorrect = isConnected && correctNetwork

    if ((prevConnected.current && !connectedAndCorrect) || (isConnected && !correctNetwork)) {
      ;(async () => {
        try {
          await fetch('/api/auth/signout', { method: 'POST', credentials: 'include' })
        } catch {
          /* ignore */
        } finally {
          clearSessionFlag()
          if (pathname !== '/connect-wallet') router.replace('/connect-wallet')
        }
      })()
    }

    prevConnected.current = connectedAndCorrect
  }, [isConnected, correctNetwork])

  /* First connect → ensure backend session */
  useEffect(() => {
    if (!isConnected || !correctNetwork || !address || sessionAlreadyEnsured()) return
    ;(async () => {
      try {
        const res = await fetch(`/api/auth/wallet-status?address=${address}`, {
          method: 'GET',
          cache: 'no-store',
          credentials: 'include',
        })
        const json = await res.json().catch(() => ({}))

        if (res.ok && json?.exists) {
          markSessionEnsured()
          if (pathname === '/connect-wallet') {
            router.replace('/dashboard')
          } else {
            router.refresh()
          }
        }
      } catch {
        /* ignore */
      }
    })()
  }, [isConnected, correctNetwork, address])

  return null
}

/* -------------------------------------------------------------------------- */
/*                             R A I N B O W  T H E M E                       */
/* -------------------------------------------------------------------------- */

function RainbowKitWithTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const rkTheme =
    resolvedTheme === 'dark'
      ? darkTheme({ accentColor: '#00e5c4', accentColorForeground: '#ffffff' })
      : lightTheme({ accentColor: '#00e5c4', accentColorForeground: '#ffffff' })

  return (
    <RainbowKitProvider theme={rkTheme}>
      <WalletConnectionListener />
      {children}
    </RainbowKitProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   P R O V I D E R                          */
/* -------------------------------------------------------------------------- */

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitWithTheme>{children}</RainbowKitWithTheme>
      </QueryClientProvider>
    </WagmiProvider>
  )
}