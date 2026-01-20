<script lang="ts">
	/**
	 * 主题提供者组件
	 * Theme Provider Component
	 *
	 * 在应用根部使用此组件来初始化主题系统
	 */
	import { onMount } from 'svelte';
	import { createThemeContext, setThemeContext, initializeTheme } from '../context.svelte';

	interface Props {
		/** 子内容 */
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let mounted = $state(false);

	// 创建并设置主题上下文
	const themeContext = createThemeContext();
	setThemeContext(themeContext);

	onMount(() => {
		// 初始化主题系统
		const cleanup = initializeTheme(themeContext);
		mounted = true;

		return cleanup;
	});
</script>

{#if mounted}
	{@render children()}
{:else}
	<!-- 防止主题闪烁，在初始化完成前显示空白或加载状态 -->
	<div class="theme-loading">
		{@render children()}
	</div>
{/if}

<style>
	.theme-loading {
		visibility: hidden;
	}
</style>
