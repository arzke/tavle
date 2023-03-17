import { expect, test } from '@playwright/test';

test('displays a table', async ({ page }) => {
	await page.goto('/');

	const table = page.getByRole('table');

	await expect(table).toBeVisible();
	await expect(table).toBeVisible();
});
