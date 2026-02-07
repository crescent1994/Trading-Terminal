/**
 * 功能开关配置
 * Feature Flags Configuration
 */
export const featuresConfig = {
	/** 多语言支持 */
	i18n: false,

	/** 通知系统 */
	notifications: true,

	/** 深色模式 */
	darkMode: true,

	/** 开发者工具 */
	devTools: import.meta.env.DEV
} as const;

/** 功能配置类型 */
export type FeaturesConfig = typeof featuresConfig;
