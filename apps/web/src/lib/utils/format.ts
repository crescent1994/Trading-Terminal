const priceFormatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const percentFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export function formatPrice(value: number): string {
	return priceFormatter.format(value);
}

export function formatPercent(value: number): string {
	return percentFormatter.format(value);
}
