<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		bottomDirection?: 'row' | 'column';
		padded?: boolean;
		gap?: 'sm' | 'md' | 'lg';
		bottomHeight?: string | null;
		bottomMinHeight?: string | null;
		bottomMaxHeight?: string | null;
		top?: Snippet;
		bottom?: Snippet;
		class?: string;
		style?: string;
		[key: string]: unknown;
	};

	let {
		bottomDirection = 'row',
		padded = true,
		gap = 'md',
		bottomHeight = null,
		bottomMinHeight = null,
		bottomMaxHeight = null,
		top,
		bottom,
		class: className,
		style: styleAttr,
		...rest
	}: Props = $props();

	const base = 'app-split-stack';
	const gapMap = {
		sm: 'var(--spacing-2, 8px)',
		md: 'var(--spacing-3, 12px)',
		lg: 'var(--spacing-4, 16px)'
	};

	const gapValue = $derived(gapMap[gap] ?? gapMap.md);
	const bottomStyle = $derived(
		[
			bottomHeight ? `--app-split-stack-bottom-height: ${bottomHeight}` : '',
			bottomMinHeight ? `--app-split-stack-bottom-min: ${bottomMinHeight}` : '',
			bottomMaxHeight ? `--app-split-stack-bottom-max: ${bottomMaxHeight}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
	const rootStyle = $derived(
		[styleAttr, `--app-split-stack-gap: ${gapValue};`].filter(Boolean).join('; ')
	);
</script>

<div
	class="{base} {base}--bottom-{bottomDirection} {padded ? `${base}--padded` : ''} {className ??
		''}"
	style={rootStyle}
	{...rest}
>
	<div class="{base}__top">
		{@render top?.()}
	</div>
	<div class="{base}__bottom" style={bottomStyle}>
		{@render bottom?.()}
	</div>
</div>

<style lang="scss">
	.app-split-stack {
		display: flex;
		flex-direction: column;
		min-height: 0;
		height: 100%;
		background: var(--color-card, #141821);
		border: 1px solid var(--color-border, #2a2f36);
		border-radius: var(--radius-lg, 12px);
	}

	.app-split-stack--padded {
		padding: var(--spacing-3, 12px);
	}

	.app-split-stack__top {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
		flex: 1 1 auto;
		min-height: 0;
		overflow: auto;
	}

	.app-split-stack__bottom {
		display: flex;
		flex: 0 0 auto;
		gap: var(--spacing-4);
		margin-top: var(--spacing-4);
		height: var(--app-split-stack-bottom-height, auto);
		min-height: var(--app-split-stack-bottom-min, 0);
		max-height: var(--app-split-stack-bottom-max, none);
	}

	.app-split-stack--bottom-row .app-split-stack__bottom {
		flex-direction: row;
		align-items: center;
	}

	.app-split-stack--bottom-column .app-split-stack__bottom {
		flex-direction: column;
		align-items: stretch;
	}
</style>
