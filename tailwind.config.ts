import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'var(--bg-deep)',
        'bg-base': 'var(--bg-base)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        accent: 'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        'accent-deep': 'var(--accent-deep)',
        'on-accent': 'var(--on-accent)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        faint: 'var(--text-faint)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        persian: ['Vazirmatn', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        strong: 'var(--border-strong)',
      },
    },
  },
  plugins: [],
} satisfies Config
