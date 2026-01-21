<script lang="ts">
	import { SplitStack, Tooltip, EmbeddedPanel } from '@app/ui';
	import type { MenuItem } from '$lib/types/menu';
	import { resolve } from '$app/paths';
	import MaterialSymbolsHomeAppLogo from '~iconify/material-symbols/home-app-logo';

	const menu: MenuItem[] = [
		{ label: '总览', path: resolve('/overview'), icon: MaterialSymbolsHomeAppLogo },
		{ label: '市场行情', path: resolve('/overview'), icon: MaterialSymbolsHomeAppLogo },
		{ label: '投资组合', path: resolve('/overview'), icon: MaterialSymbolsHomeAppLogo },
		{ label: '新闻事件', path: resolve('/overview'), icon: MaterialSymbolsHomeAppLogo },
		{ label: '我得笔记', path: resolve('/overview'), icon: MaterialSymbolsHomeAppLogo }
	];
</script>

<div class="side-menu">
	<SplitStack>
		{#snippet top()}
			{#each menu as item (item.label)}
				<EmbeddedPanel>
					<Tooltip position="right" content={item.label}>
						<div class="menu-item">
							<svelte:component this={item.icon} height="2em" />
						</div>
					</Tooltip>
				</EmbeddedPanel>
			{/each}
		{/snippet}
		{#snippet bottom()}
			2222
		{/snippet}
	</SplitStack>
</div>

<style lang="scss">
	.side-menu {
		height: 100vh;
		font-size: var(--font-size-xs);
	}
	.menu-item {
		background: var(--color-card);
		cursor: pointer;
		transition: var(--transition-fast);
		//box-shadow: var(--shadow-sm);
		//border: 1px solid black;
		//border-radius: var(--radius-lg);
		justify-content: center;
		align-items: center;
		display: flex;
		font-weight: bold;
		flex-direction: column;
		gap: var(--spacing-1);
		padding: var(--spacing-2);
		&:hover,
		&.active {
			//background: var(--color-surface);
		}
	}
</style>
