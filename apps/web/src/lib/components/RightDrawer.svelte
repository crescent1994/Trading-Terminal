<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { closeDrawer, isDrawerOpen, toggleDrawer, watchlistItems } from '$lib/stores/terminal';
	import Watchlist from './Watchlist.svelte';

	function handleKeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		const tag = target?.tagName ?? '';
		const isEditable =
			target?.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

		if (event.key === 'Escape') {
			if (get(isDrawerOpen)) closeDrawer();
			return;
		}

		if ((event.key === 'w' || event.key === 'W') && !isEditable) {
			toggleDrawer();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<aside class="drawer" class:drawer--open={$isDrawerOpen} aria-label="Watchlist drawer">
	<div class="drawer__rail">
		<button
			class="drawer__toggle"
			type="button"
			on:click={toggleDrawer}
			aria-label="Toggle watchlist"
		>
			{#if $isDrawerOpen}
				<span>X</span>
			{:else}
				<span>W</span>
			{/if}
		</button>
		<div class="drawer__count">{$watchlistItems.length}</div>
	</div>
	<div class="drawer__panel" aria-hidden={!$isDrawerOpen}>
		<div class="drawer__header">
			<h2>Watchlist</h2>
			<button class="drawer__close" type="button" on:click={closeDrawer}>Close</button>
		</div>
		<Watchlist />
	</div>
</aside>

<style>
	.drawer {
		display: grid;
		grid-template-columns: 44px 1fr;
		height: 100%;
		background: var(--color-surface, #1a1d21);
		border-left: 1px solid var(--color-border, #2a2f36);
		overflow: hidden;
	}

	.drawer__rail {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0.35rem;
		border-right: 1px solid var(--color-border, #2a2f36);
		background: var(--color-background, #111315);
	}

	.drawer__toggle {
		width: 32px;
		height: 32px;
		border-radius: 0.5rem;
		border: 1px solid var(--color-border, #2a2f36);
		background: var(--color-surface, #1a1d21);
		color: var(--color-text, #e6e8eb);
		display: grid;
		place-items: center;
	}

	.drawer__count {
		font-size: 0.75rem;
		color: var(--color-text-secondary, #b7bec8);
	}

	.drawer__panel {
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 1rem;
		padding: 1rem;
		opacity: 0;
		transform: translateX(12px);
		pointer-events: none;
		transition:
			opacity 150ms ease,
			transform 150ms ease;
	}

	.drawer--open .drawer__panel {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}

	.drawer__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.drawer__header h2 {
		margin: 0;
		font-size: 1rem;
	}

	.drawer__close {
		border: 1px solid var(--color-border, #2a2f36);
		background: transparent;
		color: var(--color-text-secondary, #b7bec8);
		border-radius: 0.4rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8rem;
	}
</style>
