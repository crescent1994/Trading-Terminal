/**
 * 主题系统模块导出
 * Theme System Module Exports
 *
 * @example
 * ```ts
 * // 导入主题 store
 * import { themeStore } from '$lib/theme';
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
 *   import { ThemeSwitcher, ThemeProvider } from '$lib/theme';
 * </script>
 *
 * <ThemeProvider>
 *   <ThemeSwitcher variant="dropdown" />
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

// 预设主题导出
export { lightTheme, darkTheme, presetThemes, DEFAULT_THEME_ID } from './presets';

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

// 组件导出
export { default as ThemeSwitcher } from './components/ThemeSwitcher.svelte';
export { default as ThemeProvider } from './components/ThemeProvider.svelte';
