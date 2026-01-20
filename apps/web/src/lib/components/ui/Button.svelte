<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;

	const base = 'tt-btn';
	$: classes = `${base} ${base}--${variant} ${base}--${size}`;
</script>

<button class={classes} {disabled}>
	<slot />
</button>

<style>
	.tt-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		border: 1px solid transparent;
		transition:
			background 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
		cursor: pointer;
	}

	.tt-btn--sm {
		font-size: 0.875rem;
		padding: 0.4rem 0.75rem;
	}

	.tt-btn--md {
		font-size: 0.95rem;
		padding: 0.55rem 1rem;
	}

	.tt-btn--lg {
		font-size: 1rem;
		padding: 0.7rem 1.2rem;
	}

	.tt-btn--primary {
		background: var(--color-primary, #3a8edb);
		color: var(--color-on-primary, #0b1116);
	}

	.tt-btn--primary:hover {
		background: var(--color-primary-hover, #2f7dc7);
	}

	.tt-btn--secondary {
		background: var(--color-surface, #1a1d21);
		border-color: var(--color-border, #2a2f36);
		color: var(--color-text, #e6e8eb);
	}

	.tt-btn--secondary:hover {
		border-color: var(--color-border-strong, #3a424d);
	}

	.tt-btn--ghost {
		background: transparent;
		border-color: var(--color-border, #2a2f36);
		color: var(--color-text, #e6e8eb);
	}

	.tt-btn--ghost:hover {
		background: var(--color-surface, #1a1d21);
	}

	.tt-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
