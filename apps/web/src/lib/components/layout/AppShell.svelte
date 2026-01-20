<script lang="ts">
</script>

<div class="shell">
	<div class="header">
		<slot name="header"></slot>
	</div>
	<div class="container">
		<div class="left"></div>
		<div class="main"><slot></slot></div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</div>

<style lang="scss">
	.shell {
		width: 100%;
		min-height: 100vh;
	}

	.container {
		width: 100%;
		display: flex;
		gap: var(--spacing-4);

		.main {
			flex: 1;
		}
		> div {
			height: 100%;
			border: 1px solid red;
		}
	}
</style>
