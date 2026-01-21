<script lang="ts">
	import { onMount } from 'svelte';
	import { marketQuotes, loadMarketQuotes } from '../store';
	import { formatPercent, formatPrice } from '$lib/utils/format';

	export let symbols: string[] = ['AAPL', 'TSLA', 'NVDA'];

	onMount(() => {
		void loadMarketQuotes(symbols);
	});
</script>

<div class="ticker">
	{#if $marketQuotes.length === 0}
		<div class="ticker__empty">No quotes yet.</div>
	{:else}
		{#each $marketQuotes as quote (quote.symbol)}
			<div class="ticker__row">
				<span class="ticker__symbol">{quote.symbol}</span>
				<span class="ticker__price">{formatPrice(quote.price)}</span>
				<span class:up={quote.change >= 0} class:down={quote.change < 0}>
					{formatPercent(quote.changePercent)}
				</span>
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.ticker {
		display: grid;
		gap: 0.5rem;
	}

	.ticker__row {
		display: grid;
		grid-template-columns: 1fr auto auto;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 0.75rem;
		border-radius: 0.5rem;
		background: var(--color-surface, #1a1d21);
		border: 1px solid var(--color-border, #2a2f36);
	}

	.ticker__symbol {
		font-weight: 600;
	}

	.ticker__price {
		font-variant-numeric: tabular-nums;
	}

	.up {
		color: var(--color-success, #3fb950);
	}

	.down {
		color: var(--color-error, #e05252);
	}

	.ticker__empty {
		color: var(--color-text-muted, #7e8793);
	}
</style>
