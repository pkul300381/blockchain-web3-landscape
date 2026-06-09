import { useRef, useEffect } from 'react'
import type { Category } from '../../data/schema'

interface HeaderProps {
  searchQuery: string
  onSearch: (q: string) => void
  totalCount: number
  filteredCount: number
  categories: Category[]
  onCategoryClick: (id: string) => void
  onMenuToggle: () => void
  hasActiveFilters: boolean
}

export default function Header({
  searchQuery,
  onSearch,
  totalCount,
  filteredCount,
  categories,
  onCategoryClick,
  onMenuToggle,
  hasActiveFilters,
}: HeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Hamburger (mobile) */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-2xl">🌐</span>
          <div className="hidden sm:block">
            <h1 className="text-base font-black text-slate-800 leading-tight">Web3 Landscape</h1>
            <p className="text-[10px] text-slate-400 leading-none">Blockchain & DLT Ecosystem</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-auto relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-slate-400 text-sm">🔍</span>
          </div>
          <input
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search projects, protocols, tools…"
            className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            aria-label="Search the landscape"
          />
          {searchQuery && (
            <button
              onClick={() => onSearch('')}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          {!searchQuery && (
            <kbd className="absolute inset-y-0 right-3 hidden sm:flex items-center text-[10px] font-mono text-slate-400">
              /
            </kbd>
          )}
        </div>

        {/* Stats */}
        <div className="flex-shrink-0 hidden md:flex items-center gap-2 text-xs text-slate-500">
          {hasActiveFilters ? (
            <span className="font-semibold text-blue-600">{filteredCount} / {totalCount}</span>
          ) : (
            <span className="font-semibold text-slate-700">{totalCount}</span>
          )}
          <span>projects</span>
        </div>
      </div>

      {/* Category quick-nav */}
      <div className="flex gap-1 overflow-x-auto px-4 pb-2 scrollbar-none" role="navigation" aria-label="Category navigation">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            <span>{cat.icon}</span>
            <span className="hidden sm:inline">{cat.name}</span>
          </button>
        ))}
      </div>
    </header>
  )
}
