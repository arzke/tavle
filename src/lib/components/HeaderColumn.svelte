<script lang="ts">
	import type { Column } from '../types';
	import { default as DefaultSortableColumn } from './SortableColumn.svelte';

	type T = $$Generic;

	export let column: Column<T>;
	export let areAllColumnsSortable: boolean;
</script>

<th>
	{#if areAllColumnsSortable || column.isSortable}
		<DefaultSortableColumn {column} />
	{:else}
		{column.name}
	{/if}
</th>
