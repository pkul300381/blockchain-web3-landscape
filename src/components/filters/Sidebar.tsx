import { useState } from 'react'
import type { Category, FilterState, MaturityStatus } from '../../data/schema'
import { CATEGORY_COLOR_MAP } from '../../data/categories'

interface SidebarProps {
  categories: Category[]
  filters: FilterState
  hasActiveFilters: boolean
  onToggleCategory: (id: string) => void
  onToggleSubcategory: (id: string) => void
  onToggleMaturity: (status: MaturityStatus) => void
  onToggleOpenSource: () => void
  onReset: () => void
  isOpen: boolean
  onClose: () => void
}

const MATURITY_OPTIONS: { value: MaturityStatus; label: string; color: string }[] = [
  { value: 'mainnet',    label: 'Mainnet',    color: 'bg-emerald-500' },
  { value: 'testnet',    label: 'Testnet',    color: 'bg-yellow-400' },
  { value: 'beta',       label: 'Beta',       color: 'bg-blue-400' },
  { value: 'deprecated', label: 'Deprecated', color: 'bg-gray-400' },
]

export default function Sidebar({
  categories,
  filters,
  hasActiveFilters,
  onToggleCategory,
  onToggleSubcategory,
  onToggleMaturity,
  onToggleOpenSource,
  onReset,
  isOpen,
  onClose,
}: SidebarProps) {
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Filters">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 flex-shrink-0">
        <h2 className="font-bold text-slate-700 text-sm">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Categories */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">Categories</p>
          <div className="space-y-0.5">
            {categories.map((cat) => {
              const colors = CATEGORY_COLOR_MAP[cat.colorKey]
              const isCatActive = filters.categories.includes(cat.id)
              const isExpanded = expandedCats.has(cat.id)
              const count = cat.items?.length ?? 0

              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleCategory(cat.id)}
                      className={`flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors text-left
                        ${isCatActive ? 'text-white font-semibold' : 'text-slate-600 hover:bg-slate-100 font-medium'}`}
                      style={isCatActive ? { backgroundColor: colors.bg } : undefined}
                    >
                      <span className="text-sm flex-shrink-0">{cat.icon}</span>
                      <span className="flex-1 truncate">{cat.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${isCatActive ? 'bg-white/20' : 'bg-slate-200 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                    <button
                      onClick={() => toggleExpand(cat.id)}
                      className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      <span className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 pl-2" style={{ borderColor: colors.border }}>
                      {cat.subcategories.map((sub) => {
                        const isSubActive = filters.subcategories.includes(sub.id)
                        const subCount = cat.items?.filter((e) => e.subcategory_id === sub.id).length ?? 0
                        return (
                          <button
                            key={sub.id}
                            onClick={() => onToggleSubcategory(sub.id)}
                            className={`w-full flex items-center justify-between px-2 py-1 rounded-md text-xs transition-colors
                              ${isSubActive ? 'bg-slate-200 text-slate-800 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                          >
                            <span className="truncate">{sub.name}</span>
                            {subCount > 0 && <span className="text-[10px] text-slate-400 flex-shrink-0 ml-1">{subCount}</span>}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Maturity */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">Status</p>
          <div className="space-y-1">
            {MATURITY_OPTIONS.map(({ value, label, color }) => {
              const isActive = filters.maturity.includes(value)
              return (
                <button
                  key={value}
                  onClick={() => onToggleMaturity(value)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors
                    ${isActive ? 'bg-slate-200 font-semibold text-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Open Source toggle */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-2">License</p>
          <button
            onClick={onToggleOpenSource}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors
              ${filters.open_source_only ? 'bg-violet-100 text-violet-800 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <span className="text-sm">🔓</span>
            Open Source Only
          </button>
        </div>
      </div>
    </nav>
  )

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30 flex flex-col
          transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:flex lg:h-auto lg:sticky lg:top-0 lg:max-h-screen
        `}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
