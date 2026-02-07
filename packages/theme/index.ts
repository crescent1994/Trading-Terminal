/**
 * 主题系统模块导出
 * Theme System Module Exports
 *
 * @example
 * ```ts
 * // 导入主题 store
 * import { themeStore } from '@app/theme';
 *
 * // 切换主题
 * themeStore.setTheme('dark');
 *
 * // 切换亮/暗模式
 * themeStore.toggleDarkMode();
 *
 * // 获取当前主题
 * const theme = themeStore.currentTheme;
 * ```
 *
 * @example
 * ```svelte
 * <script>
 *   import { ThemeProvider, getThemeContext } from '@app/theme';
 * </script>
 *
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */

// 类型导出
export type {
	Theme,
	ThemeColors,
	ThemeTypography,
	ThemeShape,
	ThemeSpacing,
	ThemeShadows,
	ThemeTransitions,
	ThemeMode,
	ThemeState
} from './types';

// Store 导出
export { themeStore } from './store.svelte';

// Context 导出
export type { ThemeContext } from './context.svelte';
export {
	createThemeContext,
	setThemeContext,
	getThemeContext,
	initializeTheme
} from './context.svelte';

// 预设主题导出
export { presetThemes, DEFAULT_THEME_ID } from './presets';

// 主题配置导出
export { darkTheme } from './themes/darkTheme';
export {
	sharedTypography,
	sharedShape,
	sharedSpacing,
	sharedTransitions
} from './themes/common';

// 工具函数导出
export {
	themeToCSSVariables,
	applyThemeToDOM,
	getSystemThemePreference,
	generateThemeCSS,
	mergeThemes,
	createCustomTheme,
	getContrastColor,
	adjustBrightness,
	hexToRgba
} from './utils';
