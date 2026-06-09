// ─── Enumerations ────────────────────────────────────────────────────────────

export type MaturityStatus = 'mainnet' | 'testnet' | 'beta' | 'deprecated' | 'archived'

export type OpenSourceLicense =
  | 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'LGPL-3.0'
  | 'BSL-1.1' | 'BUSL-1.1' | 'proprietary' | 'other'

export type ConsensusType =
  | 'PoW' | 'PoS' | 'DPoS' | 'PoA' | 'PoH'
  | 'BFT' | 'DAG' | 'Hybrid' | 'other'

export type L2Type =
  | 'Optimistic Rollup' | 'ZK Rollup' | 'Validium'
  | 'Plasma' | 'State Channel' | 'Sidechain' | 'other'

export type ExchangeType = 'CEX' | 'DEX' | 'Hybrid'
export type WalletType = 'EOA' | 'Smart Contract' | 'MPC' | 'Hardware' | 'Mobile' | 'Browser Extension'
export type AuditStatus = 'audited' | 'unaudited' | 'in-progress'

// ─── Domain-specific Metadata ────────────────────────────────────────────────

export interface BlockchainMeta {
  // L1
  native_token?: string
  consensus?: ConsensusType
  evm_compatible?: boolean
  layer?: 1 | 2 | 3
  mainnet_launch_year?: number
  tps_theoretical?: number
  tps_real?: string
  block_time_seconds?: number
  finality_seconds?: number
  // L2
  l2_type?: L2Type
  settlement_layer?: string
  data_availability?: string
  fraud_proof_window_days?: number
  // DeFi
  tvl_usd?: number
  protocol_type?: string
  supported_chains?: string[]
  audited_by?: string[]
  // Exchange
  exchange_type?: ExchangeType
  trading_volume_24h_usd?: number
  kyc_required?: boolean
  derivatives?: boolean
  // Wallet
  wallet_type?: WalletType[]
  hardware_wallet?: boolean
  multi_chain?: boolean
  self_custodial?: boolean
  // Oracle
  oracle_type?: string
  data_feeds_count?: number
  // Bridge
  bridge_mechanism?: string
  supported_bridges?: string[]
  // Identity/DAO
  governance_token?: string
  voting_mechanism?: string
  // Stablecoin
  stablecoin_type?: string
  peg_asset?: string
  collateral_ratio?: number
}

export interface MarketData {
  market_cap_usd?: number
  circulating_supply?: number
  total_supply?: number
  coingecko_id?: string
  coinmarketcap_id?: string
}

export interface AuditRecord {
  auditor: string
  date: string
  report_url?: string
  status: AuditStatus
}

// ─── Core Entry ──────────────────────────────────────────────────────────────

export interface LandscapeEntry {
  // Identity
  id: string
  name: string
  logo: string
  homepage_url: string
  description: string
  // Classification
  category_id: string
  subcategory_id: string
  additional_categories?: string[]
  tags: string[]
  maturity: MaturityStatus
  // Organization
  organization?: string
  founded_year?: number
  headquarters?: string
  team_size_range?: string
  open_source?: boolean
  license?: OpenSourceLicense
  // Links
  repo_url?: string
  docs_url?: string
  whitepaper_url?: string
  twitter?: string
  discord_url?: string
  telegram_url?: string
  blog_url?: string
  github_org?: string
  linkedin_url?: string
  // Domain metadata
  blockchain_meta?: BlockchainMeta
  market_data?: MarketData
  audits?: AuditRecord[]
  // Internal
  added_date?: string
  last_updated?: string
  featured?: boolean
}

// ─── Taxonomy ────────────────────────────────────────────────────────────────

export interface Subcategory {
  id: string
  name: string
  description?: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  colorKey: string          // matches Tailwind cat-* color key
  subcategories: Subcategory[]
  sort_order: number
  items?: LandscapeEntry[]  // populated at runtime
}

// ─── App State ───────────────────────────────────────────────────────────────

export interface FilterState {
  categories: string[]
  subcategories: string[]
  tags: string[]
  maturity: MaturityStatus[]
  open_source_only: boolean
  search_query: string
}

export const EMPTY_FILTERS: FilterState = {
  categories: [],
  subcategories: [],
  tags: [],
  maturity: [],
  open_source_only: false,
  search_query: '',
}
