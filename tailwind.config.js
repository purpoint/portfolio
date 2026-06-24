/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Production-grade dark neutral surface system.
        base: '#09090B',
        surface: '#101013',
        surface2: '#17171C',
        ink: {
          DEFAULT: '#ECECEF', // near-white text
          muted: '#9B9BA6', // secondary
          faint: '#6A6A75', // tertiary / hints
        },
        // Single accent: violet → indigo → blue.
        accent: {
          DEFAULT: '#7C5CFF',
          soft: '#9D86FF',
          blue: '#5B8DEF',
          deep: '#5B45D6',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Clean product-scale display type (not poster-condensed).
        h1: ['clamp(40px, 6.2vw, 84px)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        h2: ['clamp(30px, 4.4vw, 60px)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        label: '0.18em',
      },
      backgroundImage: {
        'accent-text': 'linear-gradient(100deg, #ECECEF 0%, #C9BCFF 55%, #9D86FF 100%)',
        'accent-grad': 'linear-gradient(120deg, #7C5CFF 0%, #5B45D6 55%, #5B8DEF 100%)',
        'grid-fade':
          'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -28px rgba(0,0,0,0.8)',
        glow: '0 0 0 1px rgba(124,92,255,0.4), 0 18px 50px -12px rgba(124,92,255,0.55)',
      },
      keyframes: {
        'aurora-drift': {
          '0%,100%': { transform: 'translate3d(-6%,0,0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(8%,-5%,0) scale(1.18)', opacity: '0.8' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cue-bob': {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'aurora-drift': 'aurora-drift 20s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'cue-bob': 'cue-bob 2.4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'fade-down': 'fade-down 0.8s cubic-bezier(0.22,1,0.36,1) both',
        'border-spin': 'border-spin 6s linear infinite',
        'spin-slow': 'border-spin 32s linear infinite',
        'spin-med': 'border-spin 18s linear infinite reverse',
        'spin-fast': 'border-spin 9s linear infinite',
      },
    },
  },
  plugins: [],
};
