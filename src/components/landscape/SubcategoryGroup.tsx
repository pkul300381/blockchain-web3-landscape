import type { LandscapeEntry, Subcategory } from '../../data/schema'
import EntryCard from './EntryCard'

interface SubcategoryGroupProps {
  subcategory: Subcategory
  entries: LandscapeEntry[]
  categoryColor: string
  selectedEntryId: string | null
  onSelect: (id: string) => void
}

export default function SubcategoryGroup({
  subcategory,
  entries,
  categoryColor,
  selectedEntryId,
  onSelect,
}: SubcategoryGroupProps) {
  if (entries.length === 0) return null

  return (
    <div className="flex gap-4 min-w-0">
      {/* Subcategory label */}
      <div className="flex-shrink-0 w-28 pt-3">
        <span className="text-xs font-semibold text-slate-500 leading-tight">{subcategory.name}</span>
        <div className="text-[10px] text-slate-400 mt-0.5">{entries.length} items</div>
      </div>

      {/* Cards grid */}
      <div className="flex flex-wrap gap-2 flex-1 py-1">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            categoryColor={categoryColor}
            isSelected={selectedEntryId === entry.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  )
}
