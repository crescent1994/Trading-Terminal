import { writable } from 'svelte/store';
import { fetchMarketQuotes } from './api';
import type { MarketQuote } from './types';

const { subscribe, set } = writable<MarketQuote[]>([]);

export const marketQuotes = { subscribe };

export async function loadMarketQuotes(symbols: string[]): Promise<void> {
	try {
		const data = await fetchMarketQuotes(symbols);
		set(data);
	} catch (error) {
		console.error('Failed to load market quotes', error);
		set([]);
	}
}
