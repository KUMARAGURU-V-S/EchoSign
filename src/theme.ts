// EchoSign Design System
// Premium dark-mode visual identity

export const Colors = {
  // Backgrounds
  bg: '#080B14',
  surface: '#0F172A',
  surfaceAlt: '#1A2744',
  surfaceHover: '#1E2D4A',
  border: '#1E3A5F',
  borderLight: '#2A4A70',

  // Accent Palette
  primary: '#6366F1',        // Indigo
  primaryGlow: 'rgba(99,102,241,0.35)',
  primaryLight: '#818CF8',
  secondary: '#22D3EE',      // Cyan
  secondaryGlow: 'rgba(34,211,238,0.25)',
  tertiary: '#A855F7',       // Violet
  tertiaryGlow: 'rgba(168,85,247,0.3)',

  // Text
  textPrimary: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#64748B',
  textDisabled: '#334155',

  // Status
  success: '#10B981',
  successGlow: 'rgba(16,185,129,0.3)',
  danger: '#EF4444',
  dangerGlow: 'rgba(239,68,68,0.3)',
  warning: '#F59E0B',

  // Overlays
  overlay: 'rgba(8,11,20,0.85)',
  cardOverlay: 'rgba(15,23,42,0.7)',

  // White/Transparent
  white: '#FFFFFF',
  transparent: 'transparent',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 17,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 42,
  hero: 56,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  black: '900' as const,
};

export const Shadows = {
  sm: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  lg: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 10,
  }),
};
