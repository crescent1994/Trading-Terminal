/**
 * 预设主题配置
 * Preset Theme Configurations
 */

import type { Theme } from './types';
import { darkTheme } from './themes/darkTheme';

/** 所有预设主题 - All Preset Themes */
export const presetThemes: Theme[] = [darkTheme];

/** 默认主题ID - Default Theme ID */
export const DEFAULT_THEME_ID = 'dark';
