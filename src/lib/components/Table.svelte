<script lang="ts">
	import { default as HeaderColumn } from './HeaderColumn.svelte';
	import { rowsStore as rowsStore } from '../stores/row';
	import type { Column, ValueGetter } from '../types';

	type T = $$Generic;

	interface TableClasses {
		table: string;
		thead: string;
		tbody: string;
		tfoot: string;
		th: string;
		tr: string;
		td: string;
	}

	export let columns: Column<T>[];
	export let rows: T[];
	export let classes: Partial<TableClasses> = {};

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

<table class={classes.table}>
	<thead class={classes.thead}>
		{#each columns as column}
			<HeaderColumn {column} {areAllColumnsSortable} class={classes.th}/>
		{/each}
	</thead>
	<tbody class={classes.tbody}>
		{#each localRows as row}
			<tr class={classes.tr}>
				{#each columns as column}
					<td class={classes.td}>{getRowValue(row, column.value)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
