<script lang="ts">
	import LeftSideMenu from '$lib/components/ui/LeftSideMenu.svelte';
</script>

<div class="shell">
	<div class="header">
		<slot name="header"></slot>
	</div>
	<div class="container">
		<div class="left"><LeftSideMenu></LeftSideMenu></div>
		<div class="main"><slot></slot></div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</div>

<style lang="scss">
	.shell {
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	.container {
		width: 100%;
		display: flex;
		gap: var(--spacing-4);

		.main {
			flex: 1;
		}
	}
</style>
