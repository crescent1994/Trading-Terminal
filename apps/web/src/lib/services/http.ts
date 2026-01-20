export async function httpGet<T>(url: string, init: RequestInit = {}): Promise<T> {
	const response = await fetch(url, {
		...init,
		headers: {
			accept: 'application/json',
			...init.headers
		}
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => '');
		const suffix = detail ? ` - ${detail}` : '';
		throw new Error(`HTTP ${response.status} ${response.statusText}${suffix}`);
	}

	return response.json() as Promise<T>;
}
