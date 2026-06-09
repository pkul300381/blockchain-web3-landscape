import { useState } from 'react'
import type { LandscapeEntry } from '../../data/schema'

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function getLogoUrl(entry: LandscapeEntry): string | null {
  // Prefer an explicitly set local logo file
  if (entry.logo) return `/logos/${entry.logo}`
  // Fall back to Clearbit logo API by domain
  const domain = getDomain(entry.homepage_url ?? '')
  if (domain) return `https://logo.clearbit.com/${domain}`
  return null
}

interface EntryLogoProps {
  entry: LandscapeEntry
  /** px size for both width and height */
  size: number
  fallbackColor: string
  className?: string
}

export default function EntryLogo({ entry, size, fallbackColor, className = '' }: EntryLogoProps) {
  const [failed, setFailed] = useState(false)
  const logoUrl = getLogoUrl(entry)

  const sizeStyle = { width: size, height: size }
  const roundedClass = size >= 48 ? 'rounded-xl' : 'rounded-lg'
  const textSize = size >= 56 ? 'text-xl' : size >= 40 ? 'text-sm' : 'text-xs'

  if (logoUrl && !failed) {
    return (
      <img
        src={logoUrl}
        alt={`${entry.name} logo`}
        loading="lazy"
        width={size}
        height={size}
        style={{ ...sizeStyle, objectFit: 'contain', backgroundColor: 'white' }}
        className={`${roundedClass} border border-slate-100 ${className}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      style={{ ...sizeStyle, backgroundColor: fallbackColor, flexShrink: 0 }}
      className={`${roundedClass} flex items-center justify-center text-white font-bold ${textSize} ${className}`}
    >
      {getInitials(entry.name)}
    </div>
  )
}
