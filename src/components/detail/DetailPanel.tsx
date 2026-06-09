import { useEffect } from 'react'
import type { LandscapeEntry, Category } from '../../data/schema'
import { CATEGORY_COLOR_MAP } from '../../data/categories'
import { MaturityBadge, OpenSourceBadge, TagChip } from '../ui/Badge'
import EntryLogo from '../ui/EntryLogo'

interface DetailPanelProps {
  entry: LandscapeEntry | null
  categories: Category[]
  onClose: () => void
}

function MetaRow({ label, value }: { label: string; value?: string | number | boolean | null }) {
  if (value === undefined || value === null || value === '') return null
  return (
    <div className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs font-medium text-slate-500 flex-shrink-0 w-28">{label}</span>
      <span className="text-xs text-slate-800 font-medium text-right">{String(value)}</span>
    </div>
  )
}

function ExternalLink({ href, label, icon }: { href?: string; label: string; icon: string }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
    >
      <span>{icon}</span>
      {label}
    </a>
  )
}

export default function DetailPanel({ entry, categories, onClose }: DetailPanelProps) {
  const cat = entry ? categories.find((c) => c.id === entry.category_id) : null
  const colors = cat ? CATEGORY_COLOR_MAP[cat.colorKey] : { bg: '#6b7280', light: '#f3f4f6' }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  if (!entry) return null

  const meta = entry.blockchain_meta

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        className="fixed inset-0 bg-black/30 z-30 lg:hidden animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-labelledby="detail-panel-title"
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-40 flex flex-col animate-slide-in-right overflow-hidden"
      >
        {/* Color accent top bar */}
        <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: colors.bg }} />

        {/* Header */}
        <div className="flex items-start gap-3 p-5 border-b border-slate-100 flex-shrink-0">
          <EntryLogo entry={entry} size={56} fallbackColor={colors.bg} />
          <div className="flex-1 min-w-0">
            <h2 id="detail-panel-title" className="font-bold text-slate-800 text-base leading-tight">
              {entry.name}
            </h2>
            {entry.organization && entry.organization !== entry.name && (
              <p className="text-xs text-slate-500 mt-0.5">{entry.organization}</p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <MaturityBadge status={entry.maturity} />
              <OpenSourceBadge isOpen={!!entry.open_source} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Category pill */}
          {cat && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: colors.bg }}
            >
              {cat.icon} {cat.name}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">{entry.description}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            <ExternalLink href={entry.homepage_url} label="Website" icon="🌐" />
            <ExternalLink href={entry.repo_url} label="GitHub" icon="💻" />
            <ExternalLink href={entry.docs_url} label="Docs" icon="📖" />
            <ExternalLink href={entry.whitepaper_url} label="Whitepaper" icon="📄" />
            {entry.twitter && (
              <ExternalLink href={`https://x.com/${entry.twitter}`} label="X / Twitter" icon="𝕏" />
            )}
            <ExternalLink href={entry.discord_url} label="Discord" icon="💬" />
            <ExternalLink href={entry.telegram_url} label="Telegram" icon="✈️" />
          </div>

          {/* General metadata */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Details</h3>
            <div>
              <MetaRow label="Founded" value={entry.founded_year} />
              <MetaRow label="Organization" value={entry.organization} />
              <MetaRow label="Headquarters" value={entry.headquarters} />
              <MetaRow label="License" value={entry.license} />
              <MetaRow label="Team Size" value={entry.team_size_range} />
            </div>
          </div>

          {/* Blockchain metadata */}
          {meta && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Details</h3>
              <div>
                <MetaRow label="Native Token" value={meta.native_token} />
                <MetaRow label="Consensus" value={meta.consensus} />
                <MetaRow label="Layer" value={meta.layer ? `L${meta.layer}` : undefined} />
                <MetaRow label="EVM Compatible" value={meta.evm_compatible !== undefined ? (meta.evm_compatible ? 'Yes' : 'No') : undefined} />
                <MetaRow label="L2 Type" value={meta.l2_type} />
                <MetaRow label="Settlement" value={meta.settlement_layer} />
                <MetaRow label="Data Avail." value={meta.data_availability} />
                <MetaRow label="TPS (Real)" value={meta.tps_real} />
                <MetaRow label="TPS (Theoretical)" value={meta.tps_theoretical} />
                <MetaRow label="Block Time" value={meta.block_time_seconds !== undefined ? `${meta.block_time_seconds}s` : undefined} />
                <MetaRow label="Finality" value={meta.finality_seconds !== undefined ? `${meta.finality_seconds}s` : undefined} />
                <MetaRow label="Protocol Type" value={meta.protocol_type} />
                <MetaRow label="Exchange Type" value={meta.exchange_type} />
                <MetaRow label="KYC Required" value={meta.kyc_required !== undefined ? (meta.kyc_required ? 'Yes' : 'No') : undefined} />
                <MetaRow label="Self-Custodial" value={meta.self_custodial !== undefined ? (meta.self_custodial ? 'Yes' : 'No') : undefined} />
                <MetaRow label="Multi-Chain" value={meta.multi_chain !== undefined ? (meta.multi_chain ? 'Yes' : 'No') : undefined} />
                <MetaRow label="Oracle Type" value={meta.oracle_type} />
                <MetaRow label="Data Feeds" value={meta.data_feeds_count} />
                <MetaRow label="Stablecoin Type" value={meta.stablecoin_type} />
                <MetaRow label="Peg Asset" value={meta.peg_asset} />
                <MetaRow label="Collateral Ratio" value={meta.collateral_ratio !== undefined ? `${meta.collateral_ratio}%` : undefined} />
                <MetaRow label="Bridge Mechanism" value={meta.bridge_mechanism} />
                <MetaRow label="Governance Token" value={meta.governance_token} />
              </div>

              {meta.supported_chains && meta.supported_chains.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-slate-500 mb-1.5">Supported Chains</p>
                  <div className="flex flex-wrap gap-1.5">
                    {meta.supported_chains.map((chain) => (
                      <span key={chain} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {chain}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Market data */}
          {entry.market_data?.coingecko_id && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Market Data</h3>
              <ExternalLink
                href={`https://www.coingecko.com/en/coins/${entry.market_data.coingecko_id}`}
                label="View on CoinGecko"
                icon="🦎"
              />
            </div>
          )}

          {/* Audits */}
          {entry.audits && entry.audits.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Security Audits</h3>
              <div className="space-y-2">
                {entry.audits.map((audit, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{audit.auditor}</p>
                      <p className="text-[10px] text-slate-400">{audit.date}</p>
                    </div>
                    {audit.report_url && (
                      <a
                        href={audit.report_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Report →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <TagChip key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
