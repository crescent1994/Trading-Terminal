<script lang="ts">
	import TopBar from "$lib/components/bars/TopBar.svelte";
	import LeftSideMenu from '$lib/components/menus/Side.svelte';
</script>

<div class="shell">
	<TopBar></TopBar>
	<div class="shell-container">
		<LeftSideMenu></LeftSideMenu>
		<div class="shell-main"><slot></slot></div>
	</div>
</div>

<style lang="scss">
	.shell {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.shell-container {
		flex: 1;
		display: flex;
		min-height: 0;
		overflow: hidden;

		.shell-main {
			flex: 1;
			min-width: 0;
			overflow: auto;
			padding-top: 68px;
		}
	}
</style>
