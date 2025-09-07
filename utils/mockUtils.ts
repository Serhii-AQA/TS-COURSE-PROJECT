import { Route } from '@playwright/test';
import { WebRoutes } from '../constants/webRoutes';
import { API_BASE_URL } from '../config/baseConfig';

type Product = { id: string; name: string; price: number; };
type ProductsListResponse = { data: Product[] };

async function fetchProducts(route: Route, page: number): Promise<ProductsListResponse> {
	const response = await route.fetch({ url: `${API_BASE_URL}${WebRoutes.Products}?page=${page}&between=price,1,100` });
	return await response.json() as ProductsListResponse;
}

export async function mockProductsResponse(route: Route) {
	const firstPage: ProductsListResponse = await fetchProducts(route, 1);
	const secondPage: ProductsListResponse = await fetchProducts(route, 2);
	const thirdPage: ProductsListResponse = await fetchProducts(route, 3);

	const combinedData = [...firstPage.data, ...secondPage.data, ...thirdPage.data].slice(0, 20);

	await route.fulfill({
		status: 200,
		contentType: 'application/json',
		body: JSON.stringify({ data: combinedData }),
	});
}
