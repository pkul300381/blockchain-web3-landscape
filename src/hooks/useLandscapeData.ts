import { useMemo } from 'react'
import yaml from 'js-yaml'
import { CATEGORIES, CATEGORY_COLOR_MAP } from '../data/categories'
import type { LandscapeEntry, Category } from '../data/schema'

// Import all YAML files as raw strings
const yamlModules = import.meta.glob('../data/entries/*.yaml', { query: '?raw', import: 'default', eager: true })

interface ParsedYaml {
  category_id: string
  items: LandscapeEntry[]
}

function loadAllEntries(): LandscapeEntry[] {
  const allEntries: LandscapeEntry[] = []
  for (const raw of Object.values(yamlModules)) {
    try {
      const parsed = yaml.load(raw as string) as ParsedYaml
      if (parsed?.items && Array.isArray(parsed.items)) {
        for (const item of parsed.items) {
          allEntries.push({
            ...item,
            category_id: item.category_id || parsed.category_id,
          })
        }
      }
    } catch (e) {
      console.error('Failed to parse YAML:', e)
    }
  }
  return allEntries
}

export interface LandscapeData {
  categories: Category[]
  allEntries: LandscapeEntry[]
  totalCount: number
}

export function useLandscapeData(): LandscapeData {
  return useMemo(() => {
    const allEntries = loadAllEntries()

    const categories: Category[] = CATEGORIES.map((cat) => {
      const items = allEntries
        .filter((e) => e.category_id === cat.id)
        .sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        })
      return { ...cat, items }
    })

    return {
      categories,
      allEntries,
      totalCount: allEntries.length,
    }
  }, [])
}

export { CATEGORY_COLOR_MAP }
