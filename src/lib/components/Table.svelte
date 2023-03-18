<script lang="ts">
	import { default as HeaderColumn } from './HeaderColumn.svelte';
	import { rowsStore as rowsStore } from '../stores/row';
	import type { Column, ComponentDefinition, ValueGetter } from '../types';
	import RawText from './RawText.svelte';
	import { activeSort, unsorted, type ActiveSort } from '$lib/stores/activeSort';

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
	export let initialSort: ActiveSort = unsorted;

	let localRows = rows;

	rowsStore.set<T>(rows);
	rowsStore.subscribe<T>((value) => {
		localRows = value;
	});
	activeSort.set(initialSort);

	const cellContent = (text: string) => ({
		component: RawText,
		props: {
			text
		}
	});

	export let areAllColumnsSortable = false;

	const getRowValue = (row: T, valueGetter: ValueGetter<T>): ComponentDefinition => {
		if (typeof valueGetter === 'function') {
			const result = valueGetter(row);

			return typeof result === 'string' ? cellContent(result) : result;
		}

		return cellContent(row[valueGetter] as string);
	};
</script>

<table class={classes.table}>
	<thead class={classes.thead}>
		<tr>
			{#each columns as column}
				<HeaderColumn {column} {areAllColumnsSortable} class={classes.th} />
			{/each}
		</tr>
	</thead>
	<tbody class={classes.tbody}>
		{#each localRows as row}
			<tr class={classes.tr}>
				{#each columns as column}
					<td class={classes.td}
						><svelte:component
							this={getRowValue(row, column.value).component}
							{...getRowValue(row, column.value).props}
						/></td
					>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
