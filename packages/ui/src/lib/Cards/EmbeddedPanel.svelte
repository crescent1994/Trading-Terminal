<script lang="ts">
	const { children, hover = true } = $props();

	const base = 'app-ep';
	const classes = $derived([base, hover ? `${base}-hover` : ''].filter(Boolean).join(' '));
</script>

<div class={classes}>
	<div class="app-ep__inner">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.app-ep {
		box-shadow: var(--shadow-inner);
		padding: 2px;
		border-radius: 10%;
		background: var(--color-surface);

		.app-ep__inner {
			border-radius: 10%;
			overflow: hidden;
			transition: var(--transition-fast);
			box-shadow: var(--shadow-sm);
		}
	}
	.app-ep-hover {
		.app-ep__inner:hover {
			box-shadow: 0 0 2px var(--color-primary-hover);
		}
	}
</style>
