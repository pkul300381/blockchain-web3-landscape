import { useReducer, useMemo, useCallback } from 'react'
import type { Category, FilterState, MaturityStatus, LandscapeEntry } from '../data/schema'
import { EMPTY_FILTERS } from '../data/schema'

type FilterAction =
  | { type: 'TOGGLE_CATEGORY'; id: string }
  | { type: 'TOGGLE_SUBCATEGORY'; id: string }
  | { type: 'TOGGLE_TAG'; tag: string }
  | { type: 'TOGGLE_MATURITY'; status: MaturityStatus }
  | { type: 'TOGGLE_OPEN_SOURCE' }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'RESET' }

function filtersReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case 'TOGGLE_CATEGORY': {
      const cats = state.categories.includes(action.id)
        ? state.categories.filter((c) => c !== action.id)
        : [...state.categories, action.id]
      return { ...state, categories: cats }
    }
    case 'TOGGLE_SUBCATEGORY': {
      const subs = state.subcategories.includes(action.id)
        ? state.subcategories.filter((s) => s !== action.id)
        : [...state.subcategories, action.id]
      return { ...state, subcategories: subs }
    }
    case 'TOGGLE_TAG': {
      const tags = state.tags.includes(action.tag)
        ? state.tags.filter((t) => t !== action.tag)
        : [...state.tags, action.tag]
      return { ...state, tags }
    }
    case 'TOGGLE_MATURITY': {
      const mat = state.maturity.includes(action.status)
        ? state.maturity.filter((m) => m !== action.status)
        : [...state.maturity, action.status]
      return { ...state, maturity: mat }
    }
    case 'TOGGLE_OPEN_SOURCE':
      return { ...state, open_source_only: !state.open_source_only }
    case 'SET_SEARCH':
      return { ...state, search_query: action.query }
    case 'RESET':
      return EMPTY_FILTERS
    default:
      return state
  }
}

export function useFilters(categories: Category[]) {
  const [filters, dispatch] = useReducer(filtersReducer, EMPTY_FILTERS)

  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        if (filters.categories.length > 0 && !filters.categories.includes(cat.id)) return false
        return true
      })
      .map((cat) => {
        const filteredItems = (cat.items ?? []).filter((entry: LandscapeEntry) => {
          if (filters.subcategories.length > 0 && !filters.subcategories.includes(entry.subcategory_id)) return false
          if (filters.maturity.length > 0 && !filters.maturity.includes(entry.maturity)) return false
          if (filters.open_source_only && !entry.open_source) return false
          if (filters.tags.length > 0 && !filters.tags.some((t) => entry.tags?.includes(t))) return false
          return true
        })
        return { ...cat, items: filteredItems }
      })
      .filter((cat) => cat.items.length > 0)
  }, [categories, filters])

  const hasActiveFilters = useMemo(
    () =>
      filters.categories.length > 0 ||
      filters.subcategories.length > 0 ||
      filters.tags.length > 0 ||
      filters.maturity.length > 0 ||
      filters.open_source_only ||
      filters.search_query.length > 0,
    [filters],
  )

  const toggleCategory = useCallback((id: string) => dispatch({ type: 'TOGGLE_CATEGORY', id }), [])
  const toggleSubcategory = useCallback((id: string) => dispatch({ type: 'TOGGLE_SUBCATEGORY', id }), [])
  const toggleMaturity = useCallback((status: MaturityStatus) => dispatch({ type: 'TOGGLE_MATURITY', status }), [])
  const toggleOpenSource = useCallback(() => dispatch({ type: 'TOGGLE_OPEN_SOURCE' }), [])
  const setSearch = useCallback((query: string) => dispatch({ type: 'SET_SEARCH', query }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  return {
    filters,
    filteredCategories,
    hasActiveFilters,
    toggleCategory,
    toggleSubcategory,
    toggleMaturity,
    toggleOpenSource,
    setSearch,
    reset,
  }
}
