import { writable } from 'svelte/store';

export type WatchlistItem = {
	symbol: string;
	name: string;
	assetClass: 'Equity' | 'Crypto' | 'FX' | 'Futures' | 'ETF';
	lastPrice: number;
	changePercent: number;
};

const mockWatchlist: WatchlistItem[] = [
	{
		symbol: 'AAPL',
		name: 'Apple Inc.',
		assetClass: 'Equity',
		lastPrice: 192.34,
		changePercent: 0.82
	},
	{
		symbol: 'NVDA',
		name: 'NVIDIA Corp.',
		assetClass: 'Equity',
		lastPrice: 865.12,
		changePercent: 1.35
	},
	{
		symbol: 'TSLA',
		name: 'Tesla Inc.',
		assetClass: 'Equity',
		lastPrice: 247.81,
		changePercent: -0.64
	},
	{
		symbol: 'BTC-USD',
		name: 'Bitcoin',
		assetClass: 'Crypto',
		lastPrice: 42580.5,
		changePercent: 2.14
	},
	{
		symbol: 'ETH-USD',
		name: 'Ethereum',
		assetClass: 'Crypto',
		lastPrice: 2280.15,
		changePercent: -1.02
	},
	{
		symbol: 'EURUSD',
		name: 'Euro / US Dollar',
		assetClass: 'FX',
		lastPrice: 1.0862,
		changePercent: 0.18
	},
	{
		symbol: 'CL=F',
		name: 'Crude Oil',
		assetClass: 'Futures',
		lastPrice: 78.42,
		changePercent: 0.42
	},
	{
		symbol: 'SPY',
		name: 'SPDR S&P 500 ETF',
		assetClass: 'ETF',
		lastPrice: 491.27,
		changePercent: 0.27
	}
];

export const watchlistItems = writable<WatchlistItem[]>(mockWatchlist);
export const selectedSymbol = writable<string>(mockWatchlist[0]?.symbol ?? '');
export const isDrawerOpen = writable<boolean>(true);

export function toggleDrawer() {
	isDrawerOpen.update((value) => !value);
}

export function closeDrawer() {
	isDrawerOpen.set(false);
}
