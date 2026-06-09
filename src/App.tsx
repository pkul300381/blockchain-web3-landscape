import { useState, useCallback, useDeferredValue, useMemo } from 'react'
import { useLandscapeData } from './hooks/useLandscapeData'
import { useFilters } from './hooks/useFilters'
import { useSearch } from './hooks/useSearch'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Sidebar from './components/filters/Sidebar'
import CategorySection from './components/landscape/CategorySection'
import SearchResults from './components/landscape/SearchResults'
import DetailPanel from './components/detail/DetailPanel'
import type { LandscapeEntry } from './data/schema'

export default function App() {
  const { categories, allEntries, totalCount } = useLandscapeData()
  const {
    filters,
    filteredCategories,
    hasActiveFilters,
    toggleCategory,
    toggleSubcategory,
    toggleMaturity,
    toggleOpenSource,
    setSearch,
    reset,
  } = useFilters(categories)

  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const deferredQuery = useDeferredValue(filters.search_query)
  const searchResults = useSearch(allEntries, deferredQuery)
  const isSearching = deferredQuery.trim().length >= 2

  const selectedEntry = useMemo<LandscapeEntry | undefined>(
    () => allEntries.find((e) => e.id === selectedEntryId),
    [allEntries, selectedEntryId],
  )

  const handleSelect = useCallback((id: string) => {
    setSelectedEntryId((prev) => (prev === id ? null : id))
  }, [])

  const handleClose = useCallback(() => setSelectedEntryId(null), [])

  const handleCategoryClick = useCallback((id: string) => {
    const el = document.getElementById(`cat-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleLogoClick = useCallback(() => {
    const mainEl = document.querySelector('main')
    if (mainEl) {
      mainEl.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const filteredCount = useMemo(
    () => filteredCategories.reduce((acc, c) => acc + (c.items?.length ?? 0), 0),
    [filteredCategories],
  )

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <Header
        searchQuery={filters.search_query}
        onSearch={setSearch}
        totalCount={totalCount}
        filteredCount={filteredCount}
        categories={categories}
        onCategoryClick={handleCategoryClick}
        onLogoClick={handleLogoClick}
        onMenuToggle={() => setSidebarOpen(true)}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="flex flex-1 min-h-0">
        <Sidebar
          categories={categories}
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onToggleCategory={toggleCategory}
          onToggleSubcategory={toggleSubcategory}
          onToggleMaturity={toggleMaturity}
          onToggleOpenSource={toggleOpenSource}
          onReset={reset}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
          <div
            className={`p-4 sm:p-6 space-y-6 transition-all duration-200 ${selectedEntry ? 'lg:mr-[420px]' : ''}`}
          >
            {/* Active filter chips */}
            {hasActiveFilters && !isSearching && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 font-medium">Filters:</span>
                {filters.categories.map((id) => {
                  const cat = categories.find((c) => c.id === id)
                  return cat ? (
                    <button
                      key={id}
                      onClick={() => toggleCategory(id)}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white border border-slate-300 text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      {cat.icon} {cat.name} ✕
                    </button>
                  ) : null
                })}
                {filters.maturity.map((m) => (
                  <button
                    key={m}
                    onClick={() => toggleMaturity(m)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white border border-slate-300 text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    {m} ✕
                  </button>
                ))}
                {filters.open_source_only && (
                  <button
                    onClick={toggleOpenSource}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white border border-slate-300 text-slate-700 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    Open Source ✕
                  </button>
                )}
                <button
                  onClick={reset}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Content: search results or category grid */}
            {isSearching ? (
              <SearchResults
                results={searchResults}
                query={deferredQuery}
                categories={categories}
                selectedEntryId={selectedEntryId}
                onSelect={handleSelect}
              />
            ) : (
              filteredCategories.map((cat) => (
                <CategorySection
                  key={cat.id}
                  category={cat}
                  selectedEntryId={selectedEntryId}
                  onSelect={handleSelect}
                />
              ))
            )}

            {filteredCategories.length === 0 && !isSearching && (
              <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-lg font-medium">No results match your filters</p>
                <button onClick={reset} className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          <Footer totalCount={totalCount} categoryCount={categories.length} />
        </main>
      </div>

      {/* Detail Panel */}
      {selectedEntry && (
        <DetailPanel
          entry={selectedEntry}
          categories={categories}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
