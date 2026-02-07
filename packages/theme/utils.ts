/**
 * 主题工具函数
 * Theme Utility Functions
 */

import type { Theme } from './types';

/**
 * 将 camelCase 转换为 kebab-case
 * Convert camelCase to kebab-case
 */
function toKebabCase(str: string): string {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * 将主题配置转换为 CSS 变量
 * Convert theme configuration to CSS variables
 */
export function themeToCSSVariables(theme: Theme): Record<string, string> {
	const variables: Record<string, string> = {};

	// 颜色变量
	for (const [key, value] of Object.entries(theme.colors)) {
		variables[`--color-${toKebabCase(key)}`] = value;
	}

	// 字体变量
	for (const [key, value] of Object.entries(theme.typography)) {
		const varName = toKebabCase(key);
		variables[`--${varName}`] = String(value);
	}

	// 形状变量
	for (const [key, value] of Object.entries(theme.shape)) {
		variables[`--${toKebabCase(key)}`] = value;
	}

	// 间距变量
	for (const [key, value] of Object.entries(theme.spacing)) {
		variables[`--${toKebabCase(key)}`] = value;
	}

	// 阴影变量
	for (const [key, value] of Object.entries(theme.shadows)) {
		variables[`--${toKebabCase(key)}`] = value;
	}

	// 过渡变量
	for (const [key, value] of Object.entries(theme.transitions)) {
		variables[`--${toKebabCase(key)}`] = value;
	}

	return variables;
}

/**
 * 将主题应用到 DOM
 * Apply theme to DOM (sets CSS variables on :root)
 */
export function applyThemeToDOM(theme: Theme): void {
	if (typeof document === 'undefined') return;

	const root = document.documentElement;
	const variables = themeToCSSVariables(theme);

	// 设置所有 CSS 变量
	for (const [property, value] of Object.entries(variables)) {
		root.style.setProperty(property, value);
	}

	// 设置 data-theme 属性用于 CSS 选择器
	root.setAttribute('data-theme', theme.id);

	// 设置 dark/light 类用于 Tailwind 暗色模式
	if (theme.isDark) {
		root.classList.add('dark');
		root.classList.remove('light');
	} else {
		root.classList.add('light');
		root.classList.remove('dark');
	}

	// 更新 meta theme-color
	updateMetaThemeColor(theme.colors.background);
}

/**
 * 更新 meta theme-color 标签
 * Update meta theme-color tag for mobile browsers
 */
function updateMetaThemeColor(color: string): void {
	if (typeof document === 'undefined') return;

	let metaThemeColor = document.querySelector('meta[name="theme-color"]');

	if (!metaThemeColor) {
		metaThemeColor = document.createElement('meta');
		metaThemeColor.setAttribute('name', 'theme-color');
		document.head.appendChild(metaThemeColor);
	}

	metaThemeColor.setAttribute('content', color);
}

/**
 * 获取系统主题偏好
 * Get system theme preference
 */
export function getSystemThemePreference(): boolean {
	if (typeof window === 'undefined') return true; // 默认暗色

	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 生成主题 CSS 字符串
 * Generate theme CSS string (for SSR or style injection)
 */
export function generateThemeCSS(theme: Theme): string {
	const variables = themeToCSSVariables(theme);
	const cssLines = Object.entries(variables)
		.map(([property, value]) => `  ${property}: ${value};`)
		.join('\n');

	return `:root {\n${cssLines}\n}`;
}

/**
 * 合并主题配置
 * Merge theme configurations (deep merge)
 */
export function mergeThemes(base: Theme, overrides: Partial<Theme>): Theme {
	return {
		...base,
		...overrides,
		colors: { ...base.colors, ...overrides.colors },
		typography: { ...base.typography, ...overrides.typography },
		shape: { ...base.shape, ...overrides.shape },
		spacing: { ...base.spacing, ...overrides.spacing },
		shadows: { ...base.shadows, ...overrides.shadows },
		transitions: { ...base.transitions, ...overrides.transitions }
	} as Theme;
}

/**
 * 创建自定义主题
 * Create a custom theme based on a preset
 */
export function createCustomTheme(
	id: string,
	name: string,
	baseTheme: Theme,
	customizations: Partial<Omit<Theme, 'id' | 'name'>>
): Theme {
	return {
		...mergeThemes(baseTheme, customizations),
		id,
		name
	};
}

/**
 * 获取对比色（用于文本在背景上的可读性）
 * Get contrasting color for text readability
 */
export function getContrastColor(hexColor: string): string {
	// 移除 # 前缀
	const hex = hexColor.replace('#', '');

	// 转换为 RGB
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// 计算亮度 (YIQ formula)
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;

	// 返回黑色或白色
	return yiq >= 128 ? '#000000' : '#ffffff';
}

/**
 * 调整颜色亮度
 * Adjust color brightness
 */
export function adjustBrightness(hexColor: string, percent: number): string {
	const hex = hexColor.replace('#', '');

	const r = Math.min(255, Math.max(0, parseInt(hex.substring(0, 2), 16) + percent));
	const g = Math.min(255, Math.max(0, parseInt(hex.substring(2, 4), 16) + percent));
	const b = Math.min(255, Math.max(0, parseInt(hex.substring(4, 6), 16) + percent));

	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * 将十六进制颜色转换为 RGBA
 * Convert hex color to RGBA
 */
export function hexToRgba(hexColor: string, alpha: number = 1): string {
	const hex = hexColor.replace('#', '');

	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
