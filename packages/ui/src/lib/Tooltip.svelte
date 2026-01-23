<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	interface Props {
		content: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
		children: Snippet;
	}

	let { content, position = 'top', delay = 200, children }: Props = $props();

	let visible = $state(false);
	let mounted = $state(false);
	let triggerEl: HTMLElement | null = $state(null);
	let tooltipEl: HTMLElement | null = $state(null);
	let coords = $state({ x: 0, y: 0 });
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	onMount(() => {
		mounted = true;
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});

	function updatePosition() {
		if (!triggerEl) return;

		const rect = triggerEl.getBoundingClientRect();
		const scrollX = window.scrollX;
		const scrollY = window.scrollY;

		switch (position) {
			case 'top':
				coords = {
					x: rect.left + scrollX + rect.width / 2,
					y: rect.top + scrollY - 8
				};
				break;
			case 'bottom':
				coords = {
					x: rect.left + scrollX + rect.width / 2,
					y: rect.bottom + scrollY + 8
				};
				break;
			case 'left':
				coords = {
					x: rect.left + scrollX - 8,
					y: rect.top + scrollY + rect.height / 2
				};
				break;
			case 'right':
				coords = {
					x: rect.right + scrollX + 8,
					y: rect.top + scrollY + rect.height / 2
				};
				break;
		}
	}

	function show() {
		timeoutId = setTimeout(() => {
			updatePosition();
			visible = true;
		}, delay);
	}

	function hide() {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		visible = false;
	}
</script>

<svelte:window onscroll={hide} onresize={hide} />

<span
	bind:this={triggerEl}
	class="tooltip-trigger"
	role="button"
	tabindex="0"
	onmouseenter={show}
	onmouseleave={hide}
	onfocus={show}
	onblur={hide}
>
	{@render children()}
</span>

{#if visible && content && mounted}
	{@const positionClass = `tooltip--${position}`}
	<div
		bind:this={tooltipEl}
		class="tooltip {positionClass}"
		style:left="{coords.x}px"
		style:top="{coords.y}px"
		role="tooltip"
	>
		{content}
		<span class="tooltip__arrow"></span>
	</div>
{/if}

<style>
	.tooltip-trigger {
		display: inline-flex;
	}

	.tooltip {
		position: fixed;
		z-index: 9999;
		padding: 0.375rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--color-text, #e6e8eb);
		background: var(--color-surface, #1a1d21);
		border: 1px solid var(--color-border, #2a2f36);
		border-radius: 0.375rem;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
		white-space: nowrap;
		pointer-events: none;
		animation: tooltip-fade-in 120ms ease-out;
	}

	.tooltip__arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--color-surface, #1a1d21);
		border: 1px solid var(--color-border, #2a2f36);
		transform: rotate(45deg);
	}

	/* Position: Top */
	.tooltip--top {
		transform: translateX(-50%) translateY(-100%);
	}
	.tooltip--top .tooltip__arrow {
		bottom: -5px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		border-top: none;
		border-left: none;
	}

	/* Position: Bottom */
	.tooltip--bottom {
		transform: translateX(-50%);
	}
	.tooltip--bottom .tooltip__arrow {
		top: -5px;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		border-bottom: none;
		border-right: none;
	}

	/* Position: Left */
	.tooltip--left {
		transform: translateX(-100%) translateY(-50%);
	}
	.tooltip--left .tooltip__arrow {
		right: -5px;
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
		border-bottom: none;
		border-left: none;
	}

	/* Position: Right */
	.tooltip--right {
		transform: translateY(-50%);
	}
	.tooltip--right .tooltip__arrow {
		left: -5px;
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
		border-top: none;
		border-right: none;
	}

	@keyframes tooltip-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
