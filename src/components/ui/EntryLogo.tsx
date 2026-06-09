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

/**
 * Returns an ordered list of logo URLs to try in sequence.
 * Each failed load advances to the next URL; if all fail the initials
 * fallback is shown.
 *
 * Sources (in priority order):
 *  1. Local file — only when `entry.logo` is explicitly set in YAML
 *  2. Google gstatic favicon (high-res, used by Google Search) — reliable & free
 *  3. Google S2 favicon (classic endpoint, smaller but very reliable) — last resort
 */
function getLogoUrls(entry: LandscapeEntry): string[] {
  const urls: string[] = []

  if (entry.logo) {
    urls.push(`/logos/${entry.logo}`)
  }

  const domain = getDomain(entry.homepage_url ?? '')
  if (domain) {
    // Higher-quality icon (up to 128 px), used by Google's own products
    urls.push(
      `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`,
    )
    // Classic fallback — almost always returns something
    urls.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`)
  }

  return urls
}

interface EntryLogoProps {
  entry: LandscapeEntry
  /** Rendered px size (width = height) */
  size: number
  fallbackColor: string
  className?: string
}

export default function EntryLogo({ entry, size, fallbackColor, className = '' }: EntryLogoProps) {
  const [urlIndex, setUrlIndex] = useState(0)
  const urls = getLogoUrls(entry)
  const currentUrl = urls[urlIndex]

  const sizeStyle = { width: size, height: size }
  const roundedClass = size >= 48 ? 'rounded-xl' : 'rounded-lg'
  const textSize = size >= 56 ? 'text-xl' : size >= 40 ? 'text-sm' : 'text-xs'

  const handleError = () => {
    if (urlIndex < urls.length - 1) {
      setUrlIndex(urlIndex + 1)
    } else {
      setUrlIndex(urls.length) // beyond last URL → show initials
    }
  }

  if (currentUrl !== undefined) {
    return (
      <img
        src={currentUrl}
        alt={`${entry.name} logo`}
        loading="lazy"
        width={size}
        height={size}
        style={{ ...sizeStyle, objectFit: 'contain', backgroundColor: 'white' }}
        className={`${roundedClass} border border-slate-100 flex-shrink-0 ${className}`}
        onError={handleError}
      />
    )
  }

  // All sources failed — show colored initials
  return (
    <div
      style={{ ...sizeStyle, backgroundColor: fallbackColor, flexShrink: 0 }}
      className={`${roundedClass} flex items-center justify-center text-white font-bold ${textSize} ${className}`}
    >
      {getInitials(entry.name)}
    </div>
  )
}
