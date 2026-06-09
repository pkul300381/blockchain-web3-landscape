import type { MaturityStatus } from '../../data/schema'

const MATURITY_STYLES: Record<MaturityStatus, string> = {
  mainnet:    'bg-emerald-100 text-emerald-800 border border-emerald-300',
  testnet:    'bg-yellow-100 text-yellow-800 border border-yellow-300',
  beta:       'bg-blue-100 text-blue-800 border border-blue-300',
  deprecated: 'bg-gray-100 text-gray-600 border border-gray-300',
  archived:   'bg-red-100 text-red-700 border border-red-300',
}

const MATURITY_DOT: Record<MaturityStatus, string> = {
  mainnet:    'bg-emerald-500',
  testnet:    'bg-yellow-400',
  beta:       'bg-blue-400',
  deprecated: 'bg-gray-400',
  archived:   'bg-red-400',
}

interface MaturityBadgeProps {
  status: MaturityStatus
  compact?: boolean
}

export function MaturityBadge({ status, compact = false }: MaturityBadgeProps) {
  if (compact) {
    return (
      <span
        className={`inline-block w-2 h-2 rounded-full ${MATURITY_DOT[status]}`}
        title={status}
      />
    )
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${MATURITY_STYLES[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${MATURITY_DOT[status]}`} />
      {status}
    </span>
  )
}

interface TagChipProps {
  label: string
  onRemove?: () => void
  colorClass?: string
}

export function TagChip({ label, onRemove, colorClass = 'bg-slate-100 text-slate-700' }: TagChipProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 hover:text-red-500 transition-colors" aria-label={`Remove ${label}`}>
          ×
        </button>
      )}
    </span>
  )
}

interface CategoryPillProps {
  name: string
  color: string
  textColor?: string
}

export function CategoryPill({ name, color, textColor = 'text-white' }: CategoryPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${textColor}`}
      style={{ backgroundColor: color }}
    >
      {name}
    </span>
  )
}

interface OpenSourceBadgeProps {
  isOpen: boolean
}

export function OpenSourceBadge({ isOpen }: OpenSourceBadgeProps) {
  if (!isOpen) return null
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700 border border-violet-200">
      Open Source
    </span>
  )
}
