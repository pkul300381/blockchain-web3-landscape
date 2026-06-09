import type { Category, LandscapeEntry } from '../../data/schema'
import { CATEGORY_COLOR_MAP } from '../../data/categories'
import SubcategoryGroup from './SubcategoryGroup'

interface CategorySectionProps {
  category: Category
  selectedEntryId: string | null
  onSelect: (id: string) => void
}

export default function CategorySection({ category, selectedEntryId, onSelect }: CategorySectionProps) {
  const colors = CATEGORY_COLOR_MAP[category.colorKey]
  const items = category.items ?? []
  if (items.length === 0) return null

  const itemsBySubcategory = category.subcategories.reduce<Record<string, LandscapeEntry[]>>((acc, sub) => {
    acc[sub.id] = items.filter((e) => e.subcategory_id === sub.id)
    return acc
  }, {})

  const visibleSubcategories = category.subcategories.filter(
    (sub) => (itemsBySubcategory[sub.id]?.length ?? 0) > 0,
  )

  return (
    <section
      id={`cat-${category.id}`}
      data-category-id={category.id}
      className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
    >
      {/* Category header */}
      <div
        className="flex items-center gap-3 px-5 py-3"
        style={{ backgroundColor: colors.bg }}
      >
        <span className="text-xl">{category.icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-white font-bold text-base leading-tight">{category.name}</h2>
          <p className="text-white/75 text-xs truncate hidden sm:block">{category.description}</p>
        </div>
        <span className="text-white/90 text-sm font-semibold bg-white/20 px-2.5 py-0.5 rounded-full flex-shrink-0">
          {items.length}
        </span>
      </div>

      {/* Subcategory rows */}
      <div className="divide-y divide-slate-100 bg-white">
        {visibleSubcategories.map((sub, idx) => (
          <div
            key={sub.id}
            className={`px-4 py-3 ${idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}
          >
            <SubcategoryGroup
              subcategory={sub}
              entries={itemsBySubcategory[sub.id] ?? []}
              categoryColor={colors.bg}
              selectedEntryId={selectedEntryId}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
