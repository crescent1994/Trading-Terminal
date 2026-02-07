/**
 * 主题状态管理 Store
 * Theme State Management Store (Svelte 5 Runes)
 */

import type { Theme, ThemeMode, ThemeState } from './types';
import { presetThemes, DEFAULT_THEME_ID } from './presets';
import { applyThemeToDOM, getSystemThemePreference } from './utils';

/** localStorage 存储键 */
const STORAGE_KEY = 'theme-preferences';

/** 从 localStorage 加载主题偏好 */
function loadFromStorage(): Partial<ThemeState> | null {
	if (typeof window === 'undefined') return null;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (e) {
		console.warn('Failed to load theme preferences from storage:', e);
	}
	return null;
}

/** 保存主题偏好到 localStorage */
function saveToStorage(state: Pick<ThemeState, 'currentThemeId' | 'mode'>): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				currentThemeId: state.currentThemeId,
				mode: state.mode
			})
		);
	} catch (e) {
		console.warn('Failed to save theme preferences to storage:', e);
	}
}

/**
 * 创建主题 Store
 * Create Theme Store with Svelte 5 Runes
 */
function createThemeStore() {
	// 加载存储的偏好
	const stored = loadFromStorage();

	// 响应式状态
	let currentThemeId = $state(stored?.currentThemeId ?? DEFAULT_THEME_ID);
	let mode = $state<ThemeMode>(stored?.mode ?? 'system');
	let themes = $state<Theme[]>([...presetThemes]);

	// 派生状态：当前主题对象
	const currentTheme = $derived.by(() => {
		// 如果是 system 模式，根据系统偏好选择主题
		if (mode === 'system') {
			const prefersDark = typeof window !== 'undefined' ? getSystemThemePreference() : true;
			const targetId = prefersDark ? 'dark' : 'light';
			return (
				themes.find((t) => t.id === targetId) ??
				themes.find((t) => t.id === currentThemeId) ??
				themes[0]
			);
		}
		return themes.find((t) => t.id === currentThemeId) ?? themes[0];
	});

	// 派生状态：是否为暗色模式
	const isDark = $derived(currentTheme?.isDark ?? false);

	// 派生状态：所有可用主题
	const availableThemes = $derived(themes);

	return {
		// Getters
		get currentThemeId() {
			return currentThemeId;
		},
		get mode() {
			return mode;
		},
		get currentTheme() {
			return currentTheme;
		},
		get isDark() {
			return isDark;
		},
		get availableThemes() {
			return availableThemes;
		},

		/**
		 * 设置主题
		 * @param themeId 主题ID
		 */
		setTheme(themeId: string) {
			const theme = themes.find((t) => t.id === themeId);
			if (theme) {
				currentThemeId = themeId;
				// 如果手动选择主题，切换到对应的 light/dark 模式
				if (mode === 'system') {
					mode = theme.isDark ? 'dark' : 'light';
				}
				saveToStorage({ currentThemeId, mode });
				applyThemeToDOM(theme);
			}
		},

		/**
		 * 设置主题模式
		 * @param newMode 主题模式
		 */
		setMode(newMode: ThemeMode) {
			mode = newMode;
			saveToStorage({ currentThemeId, mode });

			// 应用对应主题
			if (newMode === 'system') {
				const prefersDark = getSystemThemePreference();
				const targetTheme = themes.find((t) => t.id === (prefersDark ? 'dark' : 'light'));
				if (targetTheme) {
					applyThemeToDOM(targetTheme);
				}
			} else {
				const targetTheme = themes.find((t) => t.id === currentThemeId);
				if (targetTheme) {
					applyThemeToDOM(targetTheme);
				}
			}
		},

		/**
		 * 切换亮/暗模式
		 */
		toggleDarkMode() {
			const newMode: ThemeMode = isDark ? 'light' : 'dark';
			mode = newMode;

			// 找到对应模式的主题
			const targetTheme = themes.find((t) => t.isDark === (newMode === 'dark'));
			if (targetTheme) {
				currentThemeId = targetTheme.id;
				applyThemeToDOM(targetTheme);
			}

			saveToStorage({ currentThemeId, mode });
		},

		/**
		 * 注册自定义主题
		 * @param theme 主题配置
		 */
		registerTheme(theme: Theme) {
			const existingIndex = themes.findIndex((t) => t.id === theme.id);
			if (existingIndex >= 0) {
				themes[existingIndex] = theme;
			} else {
				themes = [...themes, theme];
			}
		},

		/**
		 * 移除自定义主题
		 * @param themeId 主题ID
		 */
		unregisterTheme(themeId: string) {
			// 不允许移除预设主题
			if (presetThemes.some((t) => t.id === themeId)) {
				console.warn(`Cannot unregister preset theme: ${themeId}`);
				return;
			}

			themes = themes.filter((t) => t.id !== themeId);

			// 如果当前主题被移除，切换到默认主题
			if (currentThemeId === themeId) {
				this.setTheme(DEFAULT_THEME_ID);
			}
		},

		/**
		 * 初始化主题系统
		 * 应在应用启动时调用
		 */
		initialize() {
			if (typeof window === 'undefined') return;

			// 应用当前主题
			if (currentTheme) {
				applyThemeToDOM(currentTheme);
			}

			// 监听系统主题变化
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () => {
				if (mode === 'system') {
					const prefersDark = mediaQuery.matches;
					const targetTheme = themes.find((t) => t.id === (prefersDark ? 'dark' : 'light'));
					if (targetTheme) {
						applyThemeToDOM(targetTheme);
					}
				}
			};

			mediaQuery.addEventListener('change', handleChange);

			// 返回清理函数
			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	};
}

/** 全局主题 Store 实例 */
export const themeStore = createThemeStore();
