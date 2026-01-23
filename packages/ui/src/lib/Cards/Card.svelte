<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		padded?: boolean;
		variant?: 'default' | 'outline' | 'elevated';
		radius?: 'sm' | 'md' | 'lg';
		header?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	};

	let {
		padded = true,
		variant = 'default',
		radius = 'md',
		header,
		footer,
		children
	}: Props = $props();

	const base = 'app-card';
	const classes = $derived(
		[
			base,
			`${base}--${variant}`,
			`${base}--radius-${radius}`,
			padded ? `${base}--padded` : ''
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={classes}>
	{#if header}
		<div class="app-card__header">
			{@render header?.()}
		</div>
	{/if}

	<div class="app-card__body">
		{@render children?.()}
	</div>

	{#if footer}
		<div class="app-card__footer">
			{@render footer?.()}
		</div>
	{/if}
</div>

<style lang="scss">
	.app-card {
		background: var(--color-card, #161a1f);
		color: var(--color-text, #e6e8eb);
		border: 1px solid var(--color-border, #2a2f36);
		border-radius: var(--radius-md, 12px);
		box-shadow: var(--shadow-sm, 0 6px 14px rgba(0, 0, 0, 0.18));
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.app-card--padded .app-card__header,
	.app-card--padded .app-card__body,
	.app-card--padded .app-card__footer {
		padding: var(--spacing-4, 16px);
	}

	.app-card__header {
		font-weight: 600;
		border-bottom: 1px solid var(--color-divider, rgba(255, 255, 255, 0.06));
	}

	.app-card__footer {
		border-top: 1px solid var(--color-divider, rgba(255, 255, 255, 0.06));
		color: var(--color-text-secondary, #a8b0bb);
	}

	.app-card--outline {
		background: transparent;
		box-shadow: none;
	}

	.app-card--elevated {
		box-shadow: var(--shadow-md, 0 14px 30px rgba(0, 0, 0, 0.22));
	}

	.app-card--radius-sm {
		border-radius: var(--radius-sm, 8px);
	}

	.app-card--radius-md {
		border-radius: var(--radius-md, 12px);
	}

	.app-card--radius-lg {
		border-radius: var(--radius-lg, 16px);
	}
</style>
