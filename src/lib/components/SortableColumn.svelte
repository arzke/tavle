<script lang="ts">
	import { reverse, sortByStringAttribute, type SortBy } from '../sort';
	import { rowsStore } from '../stores/row';
	import type { Column } from '../types';

	type T = $$Generic;

	export let column: Column<T>;
	let className = '';
	export { className as class };

	let sortBy: SortBy | 'unsorted' = 'unsorted';

	let rows: T[];

	rowsStore.subscribe<T>((value) => {
		rows = value;
	});

	const sortFunction =
		column.isSortable && 'sortBy' in column ? column.sortBy : sortByStringAttribute(column.value);

	const sortRows = () => {
		const sortedRows = rows.sort(sortBy === 'descending' ? reverse<T>(sortFunction) : sortFunction);

		rowsStore.set(sortedRows);

		sortBy = sortBy === 'descending' ? 'ascending' : 'descending';
	};
</script>

<th class={className} on:click={sortRows} on:keypress={sortRows}>
	<div class="container">
		<span class="column-name">{column.name}</span>
		<span class={`sorting-arrows ${sortBy}`} />
	</div>
</th>

<style>
	.container {
		cursor: pointer;
		display: flex;
	}
	.column-name {
		flex-grow: 1;
	}
	.sorting-arrows.unsorted:after {
		content: '⇅';
	}
	.sorting-arrows.descending:after {
		content: '↓';
	}
	.sorting-arrows.ascending:after {
		content: '↑';
	}
</style>
