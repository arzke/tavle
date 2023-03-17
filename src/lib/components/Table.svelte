<script lang="ts">
	import { default as HeaderColumn } from './HeaderColumn.svelte';
	import { rowsStore as rowsStore } from '../stores/row';
	import type { Column, ValueGetter } from '../types';

	type T = $$Generic;

	export let columns: Column<T>[];
	export let rows: T[];

	let localRows = rows;

	rowsStore.set<T>(rows);
	rowsStore.subscribe<T>((value) => {
		localRows = value;
	});

	export let areAllColumnsSortable = false;

	const getRowValue = (row: T, valueGetter: ValueGetter<T>) => {
		if (typeof valueGetter === 'function') {
			return valueGetter(row);
		}

		return row[valueGetter];
	};
</script>

<table>
	<thead>
		{#each columns as column}
			<HeaderColumn {column} {areAllColumnsSortable} />
		{/each}
	</thead>
	<tbody>
		{#each localRows as row}
			<tr>
				{#each columns as column}
					<td>{getRowValue(row, column.value)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
