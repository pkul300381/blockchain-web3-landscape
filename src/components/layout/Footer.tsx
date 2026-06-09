interface FooterProps {
  totalCount: number
  categoryCount: number
}

export default function Footer({ totalCount, categoryCount }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-8 px-6 mt-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-slate-700">🌐 Web3 Landscape</p>
          <p className="text-xs text-slate-500 mt-1">
            {totalCount} projects across {categoryCount} categories.
            Community-maintained open-source reference for the blockchain ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-700 transition-colors"
          >
            Contribute on GitHub
          </a>
          <span>·</span>
          <span>Data updated regularly</span>
        </div>
      </div>
    </footer>
  )
}
