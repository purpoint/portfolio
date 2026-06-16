/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm "molten editorial" palette — never pure black, never blue.
        bg: {
          top: '#1A1310', // deep warm charcoal (gradient start)
          bottom: '#0E0A08', // darker warm charcoal (gradient end)
        },
        molten: {
          amber: '#FF8A3C',
          ember: '#FF5B2E',
          red: '#C8341B',
          peach: '#FFD9A8',
        },
        ink: {
          DEFAULT: '#F5EEE6', // warm white text
          muted: '#9A8E84', // muted warm grey
        },
      },
      fontFamily: {
        display: ['Anton', 'Archivo', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Poster-scale display type.
        poster: ['clamp(64px, 13vw, 220px)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'poster-sm': ['clamp(44px, 9vw, 130px)', { lineHeight: '0.92', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        eyebrow: '0.35em',
      },
      borderColor: {
        hairline: 'rgba(255,235,220,0.10)',
      },
      backgroundImage: {
        'molten-text': 'linear-gradient(120deg, #FFD9A8 0%, #FF8A3C 35%, #FF5B2E 65%, #C8341B 100%)',
        'molten-radial': 'radial-gradient(circle at 50% 40%, rgba(255,138,60,0.35), rgba(200,52,27,0) 60%)',
        // The single iridescent sweep — used once, in the contact finale.
        iridescent:
          'linear-gradient(115deg, #FF5B2E 0%, #FF8A3C 22%, #FFD9A8 40%, #B7E36B 58%, #57E0C8 78%, #4FB6FF 100%)',
      },
      keyframes: {
        'grain-shift': {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '30%': { transform: 'translate(3%,-15%)' },
          '50%': { transform: 'translate(7%,5%)' },
          '70%': { transform: 'translate(-9%,8%)' },
          '90%': { transform: 'translate(4%,12%)' },
        },
        'haze-drift': {
          '0%,100%': { transform: 'translate3d(-5%, 0, 0) scale(1.1)', opacity: '0.5' },
          '50%': { transform: 'translate3d(8%, -6%, 0) scale(1.25)', opacity: '0.8' },
        },
        'cue-bob': {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.55' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
        'blob-churn': {
          '0%,100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%', transform: 'rotate(0deg) scale(1)' },
          '33%': { borderRadius: '60% 40% 33% 67% / 58% 62% 38% 42%', transform: 'rotate(8deg) scale(1.04)' },
          '66%': { borderRadius: '38% 62% 56% 44% / 49% 36% 64% 51%', transform: 'rotate(-6deg) scale(0.98)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'haze-drift': 'haze-drift 22s ease-in-out infinite',
        'cue-bob': 'cue-bob 2.4s ease-in-out infinite',
        'blob-churn': 'blob-churn 14s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
