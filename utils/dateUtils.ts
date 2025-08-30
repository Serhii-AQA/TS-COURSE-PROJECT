
export function getFutureExpirationDate(monthsAhead: number = 3): string {
	const now = new Date();
	now.setMonth(now.getMonth() + monthsAhead);

	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();

	return `${month}/${year}`;
}