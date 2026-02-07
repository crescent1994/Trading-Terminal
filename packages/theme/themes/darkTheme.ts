import type { Theme } from '../types';
import { sharedShape, sharedSpacing, sharedTransitions, sharedTypography } from './common';

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

		background: '#151515',
		input: '#191a1c',
		surface: '#242424',
		card: '#323439',

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
	shadows: {
		shadowNone: 'none',
		shadowNormal:
			'0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12)',
		shadowFloat:
			'0px 3px 3px -2px rgba(0, 0, 0, .2), 0px 3px 4px 0px rgba(0, 0, 0, .14), 0px 1px 8px 0px rgba(0, 0, 0, .12)',
		shadowModal:
			'0px 3px 5px -1px rgba(0, 0, 0, .2), 0px 6px 10px 0px rgba(0, 0, 0, .14), 0px 1px 18px 0px rgba(0, 0, 0, .12)',
		shadowInset: '',
		shadowDeepInset: ''
	},
	transitions: sharedTransitions
};
