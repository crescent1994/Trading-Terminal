<script lang="ts">
	import './layout.scss';
	import favicon from '$lib/assets/favicon.svg';
	import { ThemeProvider } from '$lib/theme';

	const { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ThemeProvider>
	{@render children?.()}
</ThemeProvider>
