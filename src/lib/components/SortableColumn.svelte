<script lang="ts">
	import { reverse, sortByStringAttribute, type SortBy } from '../sort';
	import { rowsStore } from '../stores/row';
	import type { Column } from '../types';

	type T = $$Generic;

	export let column: Column<T>;

	let sortBy: SortBy | null = null;

	let rows: T[];

	rowsStore.subscribe<T>((value) => {
		rows = value;
	});

	const sortFunction =
		column.isSortable && 'sortBy' in column ? column.sortBy : sortByStringAttribute(column.value);

	const sortRows = () => {
		const sortedRows = rows.sort(sortBy === 'ascending' ? sortFunction : reverse<T>(sortFunction));

		rowsStore.set(sortedRows);

		sortBy = sortBy === 'ascending' ? 'descending' : 'ascending';
	};
</script>

<div
	class:ascending={sortBy === 'ascending'}
	class:descending={sortBy === 'descending'}
	on:click={sortRows}
	on:keypress={sortRows}
>
	{column.name}
</div>

<style>
	div {
		cursor: pointer;
	}

	.descending:after {
		content: 'ᐃ';
	}
	.ascending:after {
		content: 'ᐁ';
	}
</style>
