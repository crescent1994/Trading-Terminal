<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeProvider from '$lib/components/providers/ThemeProvider.svelte';
	import { themeStore } from '@app/theme';

	const { children } = $props();

	// 获取当前主题的背景色用于 theme-color
	const themeColor = $derived(themeStore.currentTheme?.colors.background ?? '#151515');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>

<ThemeProvider>
	{@render children?.()}
</ThemeProvider>
