import React from 'react'
import type { LandscapeEntry } from '../../data/schema'
import { MaturityBadge } from '../ui/Badge'
import EntryLogo from '../ui/EntryLogo'

interface EntryCardProps {
  entry: LandscapeEntry
  categoryColor: string
  isSelected: boolean
  onSelect: (id: string) => void
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
        <EntryLogo entry={entry} size={48} fallbackColor={categoryColor} />
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
