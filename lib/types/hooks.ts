/* -------------------------------------------------------------------------- */
/*                              Hook-level Types                              */
/* -------------------------------------------------------------------------- */

/**
 * Reactive state returned by the `useRbtcUsdPrice` hook.
 */
export interface PriceState {
  /** Latest RBTC → USD conversion (null until first read). */
  usd: number | null
  /** `true` when the oracle timestamp is older than the configured max-age window. */
  stale: boolean
  /** Loading indicator while the first read is in-flight. */
  loading: boolean
}

/**
 * Options accepted by `useRbtcUsdPrice`.
 */
export interface UseRbtcUsdPriceOptions {
  /**
   * Maximum allowed age in **milliseconds** before the price is considered
   * stale. Defaults to <code>3_600_000</code> (1 hour).
   */
  maxAgeMs?: number
}