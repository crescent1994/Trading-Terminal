/**
 * 主题上下文管理
 * Theme Context Management (Svelte 5 Runes + Context API)
 */

import { getContext, setContext } from 'svelte';
import type { Theme, ThemeMode } from './types';
import { presetThemes, DEFAULT_THEME_ID } from './presets';
import { applyThemeToDOM, getSystemThemePreference } from './utils';

/** Context key */
const THEME_CONTEXT_KEY = Symbol('theme-context');

/** localStorage 存储键 */
const STORAGE_KEY = 'theme-preferences';

/** 主题上下文类型 */
export interface ThemeContext {
	readonly currentThemeId: string;
	readonly mode: ThemeMode;
	readonly currentTheme: Theme;
	readonly isDark: boolean;
	readonly availableThemes: Theme[];
	setTheme: (themeId: string) => void;
	setMode: (mode: ThemeMode) => void;
	toggleDarkMode: () => void;
	registerTheme: (theme: Theme) => void;
	unregisterTheme: (themeId: string) => void;
}

/** 从 localStorage 加载主题偏好 */
function loadFromStorage(): { currentThemeId?: string; mode?: ThemeMode } | null {
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
function saveToStorage(state: { currentThemeId: string; mode: ThemeMode }): void {
	if (typeof window === 'undefined') return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	} catch (e) {
		console.warn('Failed to save theme preferences to storage:', e);
	}
}

/**
 * 创建主题上下文
 * Create Theme Context with Svelte 5 Runes
 */
export function createThemeContext(): ThemeContext {
	// 加载存储的偏好
	const stored = loadFromStorage();

	// 响应式状态
	let currentThemeId = $state(stored?.currentThemeId ?? DEFAULT_THEME_ID);
	let mode = $state<ThemeMode>(stored?.mode ?? 'system');
	let themes = $state<Theme[]>([...presetThemes]);

	// 派生状态：当前主题对象
	const currentTheme = $derived.by(() => {
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

	const context: ThemeContext = {
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

		setTheme(themeId: string) {
			const theme = themes.find((t) => t.id === themeId);
			if (theme) {
				currentThemeId = themeId;
				if (mode === 'system') {
					mode = theme.isDark ? 'dark' : 'light';
				}
				saveToStorage({ currentThemeId, mode });
				applyThemeToDOM(theme);
			}
		},

		setMode(newMode: ThemeMode) {
			mode = newMode;
			saveToStorage({ currentThemeId, mode });

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

		toggleDarkMode() {
			const newMode: ThemeMode = isDark ? 'light' : 'dark';
			mode = newMode;

			const targetTheme = themes.find((t) => t.isDark === (newMode === 'dark'));
			if (targetTheme) {
				currentThemeId = targetTheme.id;
				applyThemeToDOM(targetTheme);
			}

			saveToStorage({ currentThemeId, mode });
		},

		registerTheme(theme: Theme) {
			const existingIndex = themes.findIndex((t) => t.id === theme.id);
			if (existingIndex >= 0) {
				themes[existingIndex] = theme;
			} else {
				themes = [...themes, theme];
			}
		},

		unregisterTheme(themeId: string) {
			if (presetThemes.some((t) => t.id === themeId)) {
				console.warn(`Cannot unregister preset theme: ${themeId}`);
				return;
			}

			themes = themes.filter((t) => t.id !== themeId);

			if (currentThemeId === themeId) {
				context.setTheme(DEFAULT_THEME_ID);
			}
		}
	};

	return context;
}

/**
 * 设置主题上下文
 * Set theme context in component tree
 */
export function setThemeContext(context: ThemeContext): void {
	setContext(THEME_CONTEXT_KEY, context);
}

/**
 * 获取主题上下文
 * Get theme context from component tree
 */
export function getThemeContext(): ThemeContext {
	const context = getContext<ThemeContext>(THEME_CONTEXT_KEY);
	if (!context) {
		throw new Error('Theme context not found. Make sure to wrap your app with ThemeProvider.');
	}
	return context;
}

/**
 * 初始化主题系统
 * Initialize theme system (call in ThemeProvider)
 */
export function initializeTheme(context: ThemeContext): () => void {
	if (typeof window === 'undefined') return () => {};

	// 应用当前主题
	if (context.currentTheme) {
		applyThemeToDOM(context.currentTheme);
	}

	// 监听系统主题变化
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	const handleChange = () => {
		if (context.mode === 'system') {
			const prefersDark = mediaQuery.matches;
			const targetTheme = context.availableThemes.find(
				(t) => t.id === (prefersDark ? 'dark' : 'light')
			);
			if (targetTheme) {
				applyThemeToDOM(targetTheme);
			}
		}
	};

	mediaQuery.addEventListener('change', handleChange);

	return () => {
		mediaQuery.removeEventListener('change', handleChange);
	};
}
