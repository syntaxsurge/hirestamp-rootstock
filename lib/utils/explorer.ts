import { CHAIN_ID } from '@/lib/config'

/**
 * Mapping of Rootstock chain IDs to their canonical explorer domains.
 */
const EXPLORER_BASE: Record<number, string> = {
  30: 'https://explorer.rsk.co',
  31: 'https://explorer.testnet.rsk.co',
}

/**
 * Return the explorer base URL for the supplied chain ID.
 */
export function explorerBase(chainId: number = CHAIN_ID): string {
  return EXPLORER_BASE[chainId] ?? 'https://explorer.rsk.co'
}

/**
 * Convenience helper that builds a full transaction URL.
 */
export function txUrl(txHash: string, chainId: number = CHAIN_ID): string {
  const base = explorerBase(chainId).replace(/\/$/, '')
  return `${base}/tx/${txHash}`
}
