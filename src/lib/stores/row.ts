import { writable, type Subscriber } from 'svelte/store';

function createRowsStore() {
	const { subscribe, set } = writable<any[]>([]);

	return {
		subscribe: <T>(subscriber: Subscriber<T[]>) => subscribe(subscriber),
		set: <T>(value: T[]) => set(value)
	};
}

export const rowsStore = createRowsStore();
