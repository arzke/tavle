import type { OrderBy } from '$lib/sort';
import { writable } from 'svelte/store';

interface ActiveSort {
	columnName: string; // Type as keyof T?
	order: OrderBy;
}

export const activeSort = writable<ActiveSort>({
	columnName: '',
	order: 'unsorted'
});
