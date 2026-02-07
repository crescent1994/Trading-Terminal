/**
 * 应用基础配置
 * App Configuration
 */
export const appConfig = {
	// 应用信息
	name: 'Trading Terminal',
	shortName: 'TT',
	description: '专业交易终端',
	version: '0.0.1',

	// SEO / Meta
	meta: {
		title: 'Trading Terminal',
		titleTemplate: '%s | Trading Terminal',
		description: '专业的交易分析与管理终端',
		keywords: ['trading', 'terminal', 'finance', 'investment'],
		author: ''
	},

	// 默认设置
	defaults: {
		theme: 'dark' as const,
		locale: 'zh-CN'
	}
} as const;

/** 应用配置类型 */
export type AppConfig = typeof appConfig;
