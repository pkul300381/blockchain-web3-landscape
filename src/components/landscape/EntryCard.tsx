import React from 'react'
import type { LandscapeEntry } from '../../data/schema'
import { MaturityBadge } from '../ui/Badge'

interface EntryCardProps {
  entry: LandscapeEntry
  categoryColor: string
  isSelected: boolean
  onSelect: (id: string) => void
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function LogoFallback({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {getInitials(name)}
    </div>
  )
}

const EntryCard = React.memo(function EntryCard({ entry, categoryColor, isSelected, onSelect }: EntryCardProps) {
  return (
    <button
      onClick={() => onSelect(entry.id)}
      className={`
        group relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-150 cursor-pointer text-center w-24
        ${isSelected
          ? 'border-2 shadow-md bg-white'
          : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
        }
      `}
      style={isSelected ? { borderColor: categoryColor } : undefined}
      aria-label={`View details for ${entry.name}`}
      aria-pressed={isSelected}
    >
      {entry.featured && (
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-white" title="Featured" />
      )}

      <div className="relative">
        {entry.logo ? (
          <img
            src={`/logos/${entry.logo}`}
            alt={`${entry.name} logo`}
            loading="lazy"
            width={48}
            height={48}
            className="w-12 h-12 object-contain rounded-lg"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        <div style={{ display: entry.logo ? 'none' : 'flex' }}>
          <LogoFallback name={entry.name} color={categoryColor} />
        </div>

        <div className="absolute -bottom-1 -right-1">
          <MaturityBadge status={entry.maturity} compact />
        </div>
      </div>

      <span className="text-[11px] font-medium text-slate-700 leading-tight line-clamp-2 w-full">
        {entry.name}
      </span>
    </button>
  )
})

export default EntryCard
