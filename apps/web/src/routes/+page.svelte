<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	onMount(async () => {
		await goto(resolve('/overview'), { replaceState: true });
	});
</script>
