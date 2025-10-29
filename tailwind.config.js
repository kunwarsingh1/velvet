/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/react-app/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'velvet-black': '#0F0F10',
        'charcoal': '#121315',
        'ink': '#1A1B1D',
        'velvet-gold': '#C9A961',
        'soft-sand': '#EDEAE3',
        'muted-text': '#B8B6B2',
        'lines': '#2A2A2A',
        'input-border': '#2B2B2B',
        'input-hover': '#3A3A3A',
        'placeholder': '#9B998F',
        'success': '#2FBF71',
        'info': '#46A2FF',
        'warning': '#F2B05E',
        'error': '#FF6B6B',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 97, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
