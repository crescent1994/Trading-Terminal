import { PUBLIC_API_BASE_URL } from '$lib/config/env';
import { httpGet } from '$lib/services/http';
import type { MarketQuote } from './types';

export async function fetchMarketQuotes(symbols: string[]): Promise<MarketQuote[]> {
	const query = symbols.length ? `?symbols=${symbols.join(',')}` : '';
	const url = `${PUBLIC_API_BASE_URL}/markets/quotes${query}`;
	return httpGet<MarketQuote[]>(url);
}
