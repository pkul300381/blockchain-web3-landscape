import type { LandscapeEntry, Category } from '../../data/schema'
import { CATEGORY_COLOR_MAP } from '../../data/categories'
import { MaturityBadge } from '../ui/Badge'

interface SearchResultsProps {
  results: LandscapeEntry[]
  query: string
  categories: Category[]
  selectedEntryId: string | null
  onSelect: (id: string) => void
}

function getInitials(name: string): string {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

export default function SearchResults({ results, query, categories, selectedEntryId, onSelect }: SearchResultsProps) {
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]))

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-lg font-medium">No results for "{query}"</p>
        <p className="text-sm mt-1">Try a different keyword or browse the landscape below</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">
        Found <span className="font-semibold text-slate-700">{results.length}</span> results for "{query}"
      </p>
      <div className="space-y-2">
        {results.map((entry) => {
          const cat = categoryMap[entry.category_id]
          const colors = cat ? CATEGORY_COLOR_MAP[cat.colorKey] : { bg: '#6b7280', light: '#f3f4f6' }
          const isSelected = selectedEntryId === entry.id

          return (
            <button
              key={entry.id}
              onClick={() => onSelect(entry.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all
                ${isSelected ? 'border-2 bg-white shadow-md' : 'border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'}`}
              style={isSelected ? { borderColor: colors.bg } : undefined}
            >
              <div
                className="w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: colors.bg }}
              >
                {getInitials(entry.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">{entry.name}</span>
                  <MaturityBadge status={entry.maturity} />
                  {cat && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                      style={{ backgroundColor: colors.bg }}
                    >
                      {cat.icon} {cat.name}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">{entry.description}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
