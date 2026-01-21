import type { Component } from 'svelte';

export interface MenuItem {
	label: string;
	icon: Component;
	path: string;
}
