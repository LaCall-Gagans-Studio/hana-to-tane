import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/collections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '5rem',
      },
      borderWidth: {
        DEFAULT: '3px',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '24px',
        pill: '9999px',
      },
      boxShadow: {
        hard: '4px 4px 0px 0px var(--color-border)',
        'hard-hover': '2px 2px 0px 0px var(--color-border)',
        'hard-lg': '8px 8px 0px 0px var(--color-border)',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
