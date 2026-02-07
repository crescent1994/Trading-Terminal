/**
 * 主题系统类型定义
 * Theme System Type Definitions
 */

/** 颜色配置 - Color Configuration */
export interface ThemeColors {
	/** 主色调 - Primary color */
	primary: string;
	/** 主色调悬停状态 - Primary hover */
	primaryHover: string;
	/** 主色调激活状态 - Primary active */
	primaryActive: string;

	/** 次要色调 - Secondary color */
	secondary: string;
	/** 次要色调悬停状态 - Secondary hover */
	secondaryHover: string;

	/** 强调色 - Accent color */
	accent: string;
	/** 强调色悬停状态 - Accent hover */
	accentHover: string;

	/** 背景色 - Background colors */
	background: string;
	/** 表面背景色 - Surface background */
	surface: string;
	/** 卡片背景色 - Card background */
	card: string;
	// 可输入背景框
	input: string;

	/** 文本颜色 - Text colors */
	text: string;
	/** 次要文本颜色 - Secondary text */
	textSecondary: string;
	/** 禁用文本颜色 - Muted text */
	textMuted: string;

	/** 边框颜色 - Border color */
	border: string;
	/** 分割线颜色 - Divider color */
	divider: string;

	/** 状态颜色 - Status colors */
	success: string;
	warning: string;
	error: string;
	info: string;

	/** 交易相关颜色 - Trading specific colors */
	bullish: string; // 上涨/买入
	bearish: string; // 下跌/卖出
}

/** 字体配置 - Typography Configuration */
export interface ThemeTypography {
	/** 主字体族 - Primary font family */
	fontFamily: string;
	/** 等宽字体族 - Monospace font family */
	fontFamilyMono: string;
	/** 标题字体族 - Heading font family */
	fontFamilyHeading: string;

	/** 字体大小 - Font sizes */
	fontSizeXs: string;
	fontSizeSm: string;
	fontSizeBase: string;
	fontSizeLg: string;
	fontSizeXl: string;
	fontSize2xl: string;
	fontSize3xl: string;
	fontSize4xl: string;

	/** 字重 - Font weights */
	fontWeightLight: number;
	fontWeightNormal: number;
	fontWeightMedium: number;
	fontWeightSemibold: number;
	fontWeightBold: number;

	/** 行高 - Line heights */
	lineHeightTight: string;
	lineHeightNormal: string;
	lineHeightRelaxed: string;

	/** 字间距 - Letter spacing */
	letterSpacingTight: string;
	letterSpacingNormal: string;
	letterSpacingWide: string;
}

/** 形状配置 - Shape Configuration */
export interface ThemeShape {
	/** 圆角 - Border radius */
	radiusNone: string;
	radiusSm: string;
	radiusMd: string;
	radiusLg: string;
	radiusXl: string;
	radius2xl: string;
	radiusFull: string;

	/** 边框宽度 - Border widths */
	borderWidthNone: string;
	borderWidthThin: string;
	borderWidthNormal: string;
	borderWidthThick: string;
}

/** 间距配置 - Spacing Configuration */
export interface ThemeSpacing {
	spacing0: string;
	spacing1: string;
	spacing2: string;
	spacing3: string;
	spacing4: string;
	spacing5: string;
	spacing6: string;
	spacing8: string;
	spacing10: string;
	spacing12: string;
	spacing16: string;
	spacing20: string;
	spacing24: string;
}

/** 阴影配置 - Shadow Configuration */
export interface ThemeShadows {
	shadowNone: string;
	shadowNormal: string;
	shadowFloat: string;
	shadowModal: string;
	shadowInset: string;
	shadowDeepInset: string;
}

/** 过渡动画配置 - Transition Configuration */
export interface ThemeTransitions {
	transitionFast: string;
	transitionNormal: string;
	transitionSlow: string;
	transitionEasing: string;
}

/** 完整主题配置 - Complete Theme Configuration */
export interface Theme {
	/** 主题唯一标识 - Theme unique identifier */
	id: string;
	/** 主题名称 - Theme display name */
	name: string;
	/** 是否为暗色主题 - Is dark theme */
	isDark: boolean;

	/** 颜色配置 */
	colors: ThemeColors;
	/** 字体配置 */
	typography: ThemeTypography;
	/** 形状配置 */
	shape: ThemeShape;
	/** 间距配置 */
	spacing: ThemeSpacing;
	/** 阴影配置 */
	shadows: ThemeShadows;
	/** 过渡动画配置 */
	transitions: ThemeTransitions;
}

/** 主题模式 - Theme Mode */
export type ThemeMode = 'light' | 'dark' | 'system';

/** 主题存储状态 - Theme Store State */
export interface ThemeState {
	/** 当前主题ID */
	currentThemeId: string;
	/** 主题模式 */
	mode: ThemeMode;
	/** 已注册的主题列表 */
	themes: Theme[];
}
