<script lang="ts">
	import type { Column } from '../types';
	import { default as SortableColumn } from './SortableColumn.svelte';

	type T = $$Generic;

	export let column: Column<T>;
	export let areAllColumnsSortable: boolean;

	let className = '';
  	export { className as class }
</script>

<th class={className}>
	{#if areAllColumnsSortable || column.isSortable}
		<SortableColumn {column} />
	{:else}
		{column.name}
	{/if}
</th>
