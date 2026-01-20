import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'tt-theme';
const DEFAULT_THEME = 'dark';

let current = browser ? (localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME) : DEFAULT_THEME;
const { subscribe, set } = writable<string>(current);

function update(value: string) {
	set(value);
	current = value;
	if (browser) {
		localStorage.setItem(STORAGE_KEY, value);
	}
}

export const themeId = {
	subscribe,
	set: update
};

export function toggleTheme() {
	update(current === 'dark' ? 'light' : 'dark');
}
