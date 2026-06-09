/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cat-l1':         { DEFAULT: '#7c3aed', light: '#ede9fe', border: '#a78bfa' },
        'cat-l2':         { DEFAULT: '#2563eb', light: '#dbeafe', border: '#60a5fa' },
        'cat-defi':       { DEFAULT: '#059669', light: '#d1fae5', border: '#34d399' },
        'cat-stable':     { DEFAULT: '#ca8a04', light: '#fef9c3', border: '#facc15' },
        'cat-exchange':   { DEFAULT: '#ea580c', light: '#ffedd5', border: '#fb923c' },
        'cat-wallet':     { DEFAULT: '#0284c7', light: '#e0f2fe', border: '#38bdf8' },
        'cat-nft':        { DEFAULT: '#db2777', light: '#fce7f3', border: '#f472b6' },
        'cat-infra':      { DEFAULT: '#475569', light: '#f1f5f9', border: '#94a3b8' },
        'cat-devtools':   { DEFAULT: '#4338ca', light: '#e0e7ff', border: '#818cf8' },
        'cat-data':       { DEFAULT: '#0d9488', light: '#ccfbf1', border: '#2dd4bf' },
        'cat-oracle':     { DEFAULT: '#d97706', light: '#fffbeb', border: '#fbbf24' },
        'cat-bridge':     { DEFAULT: '#0891b2', light: '#cffafe', border: '#22d3ee' },
        'cat-identity':   { DEFAULT: '#7e22ce', light: '#f3e8ff', border: '#c084fc' },
        'cat-token':      { DEFAULT: '#be185d', light: '#fdf2f8', border: '#f9a8d4' },
        'cat-enterprise': { DEFAULT: '#57534e', light: '#fafaf9', border: '#a8a29e' },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.2s ease-out',
        'fade-in': 'fadeIn 0.15s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

