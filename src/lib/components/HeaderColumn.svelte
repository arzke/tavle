<script lang="ts">
	import type { Column } from '../types';
	import { default as SortableColumn } from './SortableColumn.svelte';

	type T = $$Generic;

	export let column: Column<T>;
	export let areAllColumnsSortable: boolean;

	let className = '';
	export { className as class };
</script>

{#if areAllColumnsSortable || column.isSortable}
	<SortableColumn {column} class={className} />
{:else}
	<th class={className}>
		{column.name}
	</th>
{/if}
