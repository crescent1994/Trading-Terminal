<script lang="ts">
	import { selectedSymbol, watchlistItems } from '$lib/stores/terminal';
	import type { WatchlistItem } from '$lib/stores/terminal';

	let query = '';

	function matchesQuery(item: WatchlistItem, search: string) {
		const value = search.trim().toLowerCase();
		if (!value) return true;
		return item.symbol.toLowerCase().includes(value) || item.name.toLowerCase().includes(value);
	}

	$: filtered = $watchlistItems.filter((item) => matchesQuery(item, query));
</script>

<div class="watchlist">
	<div class="watchlist__search">
		<input type="search" placeholder="Search symbol or name" bind:value={query} />
	</div>

	<div class="watchlist__list">
		{#if filtered.length === 0}
			<div class="watchlist__empty">No matches.</div>
		{:else}
			{#each filtered as item (item.symbol)}
				<button
					type="button"
					class="watchlist__row"
					class:selected={item.symbol === $selectedSymbol}
					on:click={() => selectedSymbol.set(item.symbol)}
				>
					<div class="watchlist__left">
						<div class="watchlist__symbol">{item.symbol}</div>
						<div class="watchlist__name">{item.name}</div>
						<span class="watchlist__chip">{item.assetClass}</span>
					</div>
					<div class="watchlist__right">
						<div class="watchlist__price">{item.lastPrice.toFixed(2)}</div>
						<div class:positive={item.changePercent >= 0} class:negative={item.changePercent < 0}>
							{item.changePercent >= 0 ? '+' : ''}
							{item.changePercent.toFixed(2)}%
						</div>
					</div>
				</button>
			{/each}
		{/if}
	</div>
</div>

<style>
	.watchlist {
		display: grid;
		gap: 0.75rem;
		height: 100%;
	}

	.watchlist__search input {
		width: 100%;
		padding: 0.55rem 0.75rem;
		border-radius: 0.6rem;
		background: var(--color-background, #111315);
	}

	.watchlist__list {
		display: grid;
		gap: 0.5rem;
		overflow: auto;
		padding-right: 0.25rem;
	}

	.watchlist__row {
		border: 1px solid var(--color-border, #2a2f36);
		background: var(--color-card, #20252b);
		border-radius: 0.6rem;
		padding: 0.65rem 0.75rem;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.75rem;
		align-items: center;
		text-align: left;
		color: inherit;
	}

	.watchlist__row:hover {
		border-color: var(--color-primary, #3a8edb);
	}

	.watchlist__row.selected {
		background: color-mix(in srgb, var(--color-primary, #3a8edb) 15%, transparent);
		border-color: var(--color-primary, #3a8edb);
	}

	.watchlist__left {
		display: grid;
		gap: 0.2rem;
	}

	.watchlist__symbol {
		font-weight: 600;
	}

	.watchlist__name {
		color: var(--color-text-secondary, #b7bec8);
		font-size: 0.85rem;
	}

	.watchlist__chip {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		background: var(--color-surface, #1a1d21);
		border: 1px solid var(--color-border, #2a2f36);
		color: var(--color-text-muted, #7e8793);
		font-size: 0.7rem;
		width: fit-content;
	}

	.watchlist__right {
		text-align: right;
		display: grid;
		gap: 0.2rem;
		font-variant-numeric: tabular-nums;
	}

	.watchlist__price {
		font-weight: 600;
	}

	.positive {
		color: var(--color-success, #3fb950);
	}

	.negative {
		color: var(--color-error, #e05252);
	}

	.watchlist__empty {
		color: var(--color-text-muted, #7e8793);
		font-size: 0.9rem;
	}
</style>
