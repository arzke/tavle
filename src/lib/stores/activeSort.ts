import type { OrderBy } from '$lib/sort';
import { writable } from 'svelte/store';

export interface ActiveSort {
	columnName: string; // Type as keyof T?
	order: OrderBy;
}

export const unsorted: ActiveSort = {
	columnName: '',
	order: 'unsorted'
};

export const activeSort = writable<ActiveSort>(unsorted);
