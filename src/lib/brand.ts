// Brand colors and design tokens
export const BRAND_COLORS = {
  black: '#1A1A1A',
  gold: '#C9A961',
  offWhite: '#F2F2F2',
  darkGray: '#2A2A2A',
  lightGray: '#E5E5E5',
} as const;

// Typography scales
export const TYPOGRAPHY = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-semibold',
  body: 'text-base md:text-lg',
  small: 'text-sm',
  xs: 'text-xs',
} as const;

// Animations
export const TRANSITIONS = {
  fast: { duration: 0.18 },
  medium: { duration: 0.22 },
  slow: { duration: 0.3 },
} as const;

// Glassmorphism styles
export const GLASS_STYLES = {
  card: 'bg-white/5 backdrop-blur-md border border-white/10',
  button: 'bg-white/10 backdrop-blur-sm border border-white/20',
  input: 'bg-white/5 backdrop-blur-sm border border-white/20',
} as const;

// Gold accent styles
export const GOLD_STYLES = {
  border: 'border-velvet-gold',
  text: 'text-velvet-gold',
  bg: 'bg-velvet-gold',
  glow: 'shadow-lg shadow-velvet-gold/20',
  hover: 'hover:border-velvet-gold hover:shadow-lg hover:shadow-velvet-gold/20',
} as const;
