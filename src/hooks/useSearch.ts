import { useMemo } from 'react'
import Fuse, { type IFuseOptions } from 'fuse.js'
import type { LandscapeEntry } from '../data/schema'

const FUSE_OPTIONS: IFuseOptions<LandscapeEntry> = {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'description', weight: 0.2 },
    { name: 'tags', weight: 0.15 },
    { name: 'organization', weight: 0.1 },
    { name: 'subcategory_id', weight: 0.05 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
}

export function useSearch(entries: LandscapeEntry[], query: string): LandscapeEntry[] {
  const fuse = useMemo(() => new Fuse(entries, FUSE_OPTIONS), [entries])

  return useMemo(() => {
    if (!query || query.trim().length < 2) return []
    return fuse.search(query.trim()).map((r) => r.item)
  }, [fuse, query])
}
