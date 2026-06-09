# 🌐 Blockchain & Web3 Landscape

A community-maintained interactive landscape of the Blockchain, Web3, DLT, and decentralized finance ecosystem — inspired by [landscape.cncf.io](https://landscape.cncf.io/).

## Features

- **15 categories** covering L1/L2 blockchains, DeFi, stablecoins, exchanges, wallets, NFTs, infrastructure, developer tools, data/analytics, oracles, bridges, identity/DAO, tokenization, and enterprise DLT
- **270+ curated entries** with logos, descriptions, metadata, and external links
- **Fuzzy search** across all projects and protocols
- **Sidebar filters** by category, subcategory, maturity status, and open-source license
- **Detail panel** with rich metadata: technical specs, supported chains, audit records, market data links
- **Responsive** — works on mobile, tablet, and desktop
- **Static** — no backend required, deploys to any static host

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a New Entry

All landscape data lives in YAML files under `src/data/entries/`. Each file corresponds to one category.

### Step 1 — Find the right file

| File | Category |
|------|----------|
| `l1-blockchains.yaml` | Layer 1 Blockchains |
| `l2-solutions.yaml` | Layer 2 Solutions |
| `defi-protocols.yaml` | DeFi Protocols |
| `stablecoins.yaml` | Stablecoins |
| `exchanges.yaml` | Exchanges |
| `wallets.yaml` | Wallets |
| `nft-platforms.yaml` | NFT Platforms |
| `infrastructure.yaml` | Infrastructure & Middleware |
| `dev-tools.yaml` | Developer Tools |
| `data-analytics.yaml` | Data & Analytics |
| `oracles.yaml` | Oracles |
| `bridges.yaml` | Bridges & Interoperability |
| `identity-dao.yaml` | Identity & DAO |
| `tokenization.yaml` | Tokenization |
| `enterprise-dlt.yaml` | Enterprise DLT |

### Step 2 — Add your entry

```yaml
- id: my-project                    # unique slug, lowercase, hyphens
  name: My Project
  logo: "category/my-project.svg"   # place SVG in public/logos/
  homepage_url: https://example.com
  description: A one-to-three sentence description of what this project does.
  subcategory_id: some-subcategory  # must match a subcategory in categories.ts
  tags: [tag1, tag2, tag3]
  maturity: mainnet                 # mainnet | testnet | beta | deprecated | archived
  open_source: true
  license: MIT
  repo_url: https://github.com/org/repo
  docs_url: https://docs.example.com
  twitter: myproject
  discord_url: https://discord.gg/invite
  founded_year: 2022
  organization: My Organization
  blockchain_meta:                  # optional, category-specific fields
    supported_chains: [ethereum, polygon]
  market_data:
    coingecko_id: my-project-id     # optional, for CoinGecko link
```

### Step 3 — Add a logo (optional)

Place an SVG file in `public/logos/{category}/`. The `logo` field should be the relative path from `public/logos/`, e.g., `l1/ethereum.svg`.

If no logo is provided (or the file is missing), a colored initials avatar is generated automatically.

## Project Structure

```
src/
├── data/
│   ├── schema.ts        # TypeScript interfaces for all data types
│   ├── categories.ts    # Category/subcategory registry and color map
│   └── entries/         # One YAML file per category (15 files)
├── hooks/
│   ├── useLandscapeData.ts  # Loads and merges all YAML at build time
│   ├── useFilters.ts        # Filter state management
│   └── useSearch.ts         # Fuzzy search via Fuse.js
├── components/
│   ├── layout/          # Header, Footer
│   ├── landscape/       # CategorySection, SubcategoryGroup, EntryCard, SearchResults
│   ├── detail/          # DetailPanel with full metadata
│   ├── filters/         # Sidebar with category/maturity/open-source filters
│   └── ui/              # Badge, TagChip, CategoryPill
public/
└── logos/               # SVG logos organized by category slug
```

## Adding a New Category

1. Add a new `Category` object to `src/data/categories.ts` with a unique `id`, `colorKey`, `icon`, and `subcategories`
2. Add a color entry for the new `colorKey` in `CATEGORY_COLOR_MAP` in `categories.ts`
3. Add the Tailwind color tokens in `tailwind.config.js`
4. Create a new file `src/data/entries/{your-category-id}.yaml`

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — build tool
- **Tailwind CSS 3** — utility-first styling
- **Fuse.js** — fuzzy client-side search
- **js-yaml** — YAML parsing at build time via `import.meta.glob`

## Roadmap

- [ ] Grow to 500+ entries
- [ ] Fetch CoinGecko market caps at build time via GitHub Actions
- [ ] Fetch DefiLlama TVL data at build time
- [ ] Grid density toggle (small / medium / large cards)
- [ ] List view alternative
- [ ] Compare mode (side-by-side comparison of up to 3 entries)
- [ ] Chain-based cross-filtering
- [ ] Force-directed ecosystem graph view
- [ ] PWA / offline support
- [ ] Automated logo fetching

## Contributing

Pull requests are welcome! To contribute:

1. Fork the repository
2. Add or update entries in the relevant YAML file
3. Add a logo SVG to `public/logos/` (optional but encouraged)
4. Submit a PR with a clear description of what was added/changed

**Logo guidelines:**
- SVG format preferred (PNG acceptable)
- Transparent background
- Square or near-square aspect ratio
- Should include the project name or be clearly recognizable

## License

MIT
