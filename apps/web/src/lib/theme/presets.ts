/**
 * 预设主题配置
 * Preset Theme Configurations
 */

import type {
	Theme,
	ThemeTypography,
	ThemeShape,
	ThemeSpacing,
	ThemeShadows,
	ThemeTransitions
} from './types';

/** 共享的字体配置 - Shared Typography */
const sharedTypography: ThemeTypography = {
	fontFamily:
		'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	fontFamilyMono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
	fontFamilyHeading:
		'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

	fontSizeXs: '0.75rem',
	fontSizeSm: '0.875rem',
	fontSizeBase: '1rem',
	fontSizeLg: '1.125rem',
	fontSizeXl: '1.25rem',
	fontSize2xl: '1.5rem',
	fontSize3xl: '1.875rem',
	fontSize4xl: '2.25rem',

	fontWeightLight: 300,
	fontWeightNormal: 400,
	fontWeightMedium: 500,
	fontWeightSemibold: 600,
	fontWeightBold: 700,

	lineHeightTight: '1.25',
	lineHeightNormal: '1.5',
	lineHeightRelaxed: '1.75',

	letterSpacingTight: '-0.025em',
	letterSpacingNormal: '0',
	letterSpacingWide: '0.025em'
};

/** 共享的形状配置 - Shared Shape */
const sharedShape: ThemeShape = {
	radiusNone: '0',
	radiusSm: '0.25rem',
	radiusMd: '0.375rem',
	radiusLg: '0.5rem',
	radiusXl: '0.75rem',
	radius2xl: '1rem',
	radiusFull: '9999px',

	borderWidthNone: '0',
	borderWidthThin: '1px',
	borderWidthNormal: '2px',
	borderWidthThick: '4px'
};

/** 共享的间距配置 - Shared Spacing */
const sharedSpacing: ThemeSpacing = {
	spacing0: '0',
	spacing1: '0.25rem',
	spacing2: '0.5rem',
	spacing3: '0.75rem',
	spacing4: '1rem',
	spacing5: '1.25rem',
	spacing6: '1.5rem',
	spacing8: '2rem',
	spacing10: '2.5rem',
	spacing12: '3rem',
	spacing16: '4rem',
	spacing20: '5rem',
	spacing24: '6rem'
};

/** 共享的阴影配置 - Shared Shadows (Light) */
const lightShadows: ThemeShadows = {
	shadowNone: 'none',
	shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
	shadowXl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
	shadow2xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
	shadowInner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
};

/** 暗色主题阴影配置 - Dark Shadows */
const darkShadows: ThemeShadows = {
	shadowNone: 'none',
	shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.45)',
	shadowMd: '0 6px 12px -4px rgb(0 0 0 / 0.55), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
	shadowLg: '0 12px 20px -6px rgb(0 0 0 / 0.6), 0 4px 8px -4px rgb(0 0 0 / 0.45)',
	shadowXl: '0 18px 28px -8px rgb(0 0 0 / 0.65), 0 6px 12px -6px rgb(0 0 0 / 0.5)',
	shadow2xl: '0 28px 50px -14px rgb(0 0 0 / 0.7)',
	shadowInner: 'inset 0 1px 3px 0 rgb(0 0 0 / 0.5)'
};

/** 共享的过渡配置 - Shared Transitions */
const sharedTransitions: ThemeTransitions = {
	transitionFast: '150ms',
	transitionNormal: '200ms',
	transitionSlow: '300ms',
	transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};

/**
 * 亮色主题 - Light Theme
 */
export const lightTheme: Theme = {
	id: 'light',
	name: '亮色主题',
	isDark: false,

	colors: {
		primary: '#3b82f6',
		primaryHover: '#2563eb',
		primaryActive: '#1d4ed8',

		secondary: '#64748b',
		secondaryHover: '#475569',

		accent: '#8b5cf6',
		accentHover: '#7c3aed',

		background: '#ffffff',
		surface: '#f8fafc',
		card: '#ffffff',

		text: '#0f172a',
		textSecondary: '#475569',
		textMuted: '#94a3b8',

		border: '#e2e8f0',
		divider: '#f1f5f9',

		success: '#22c55e',
		warning: '#f59e0b',
		error: '#ef4444',
		info: '#3b82f6',

		bullish: '#22c55e',
		bearish: '#ef4444'
	},

	typography: sharedTypography,
	shape: sharedShape,
	spacing: sharedSpacing,
	shadows: lightShadows,
	transitions: sharedTransitions
};

/**
 * 暗色主题 - Dark Theme
 */
export const darkTheme: Theme = {
	id: 'dark',
	name: '暗色主题',
	isDark: true,

	colors: {
		primary: '#3a8edb',
		primaryHover: '#2f7dc7',
		primaryActive: '#2569a8',

		secondary: '#9aa6b2',
		secondaryHover: '#b7c0cc',

		accent: '#d08b3c',
		accentHover: '#b97932',

		background: '#111315',
		surface: '#1a1d21',
		card: '#20252b',

		text: '#e6e8eb',
		textSecondary: '#b7bec8',
		textMuted: '#7e8793',

		border: '#2a2f36',
		divider: '#1a1d21',

		success: '#3fb950',
		warning: '#d9a441',
		error: '#e05252',
		info: '#3a8edb',

		bullish: '#3fb950',
		bearish: '#e05252'
	},

	typography: sharedTypography,
	shape: sharedShape,
	spacing: sharedSpacing,
	shadows: darkShadows,
	transitions: sharedTransitions
};

/** 所有预设主题 - All Preset Themes */
export const presetThemes: Theme[] = [lightTheme, darkTheme];

/** 默认主题ID - Default Theme ID */
export const DEFAULT_THEME_ID = 'dark';
