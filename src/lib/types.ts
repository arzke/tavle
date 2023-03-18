import type { ComponentType } from 'svelte';

export interface ComponentDefinition {
	component: ComponentType;
	props: Record<string, unknown>;
}

export type ValueGetter<T> = keyof T | ((value: T) => string);

export type SortFunction<T> = (a: T, b: T) => SortReturn;
export type SortReturn = -1 | 0 | 1;

export interface StaticColumn<T> {
	name: keyof T;
	value: ValueGetter<T>;
	isSortable?: boolean;
}

export interface SortableColumn<T> extends StaticColumn<T> {
	isSortable: true;
	sortBy: SortFunction<T>;
}

export type Column<T> = StaticColumn<T> | SortableColumn<T>;

export type Row = Record<string, string>;
