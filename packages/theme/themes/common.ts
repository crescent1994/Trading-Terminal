import type { ThemeShape, ThemeSpacing, ThemeTransitions, ThemeTypography } from '../types';

/** 共享的字体配置 - Shared Typography */
export const sharedTypography: ThemeTypography = {
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
export const sharedShape: ThemeShape = {
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
export const sharedSpacing: ThemeSpacing = {
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

/** 共享的过渡配置 - Shared Transitions */
export const sharedTransitions: ThemeTransitions = {
	transitionFast: '150ms',
	transitionNormal: '200ms',
	transitionSlow: '300ms',
	transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
};
