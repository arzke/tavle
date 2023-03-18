<script lang="ts">
	import { Table } from '$lib';
	import type { Column } from '$lib';
	import { sortByStringAttribute } from '$lib/sort';
	import { users, type User } from './createUser';

	const columns: Column<User>[] = [
		{
			name: 'id',
			value: 'id',
		},
		{
			name: 'username',
			value: (user) => user.username,
			isSortable: true,
			sortBy: sortByStringAttribute<User>((user: User) => user.username) // A function can be passed to sortByStringAttribute
		},
		{
			name: 'email',
			value: 'email',
			isSortable: true,
			sortBy: sortByStringAttribute<User>('email') // This is the default sort function
		},
		{
			name: 'country',
			value: 'country',
			isSortable: true,
		}
	];

	const rows: User[] = users;
</script>

<h1>Welcome to tavle</h1>

<div class="container">
	<Table
		{columns}
		{rows}
		areAllColumnsSortable={false}
		initialSort={{
			columnName: 'username',
			order: 'ascending'
		}}
		classes={{
			table: 'table',
			thead: 'table-header',
			th: 'table-header-cell',
			tbody: 'table-body',
			tfoot: 'table-footer',
			tr: 'table-row',
			td: 'table-data-cell'
		}}
	/>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');

	.container :global(.table) {
		background: #f2f2f2;
		border-collapse: collapse;
		border-radius: 10px;
		font-family: 'Roboto';
	}
	
	.container :global(.table-header-cell),
	.container :global(.table-data-cell) {
		padding: 1rem;
	}

	.container :global(.table-header) {
		text-transform: capitalize;
		border-bottom: 2px solid #b2b2b2;
		background: #30e5a2;
		color: #373737;
	}

	.container :global(.table-row:not(:last-child)) {
		border-bottom: 1px solid #d2d2d2;
	}

	.container :global(.table-row:nth-child(odd)) {
		background: #e2e2e2;
	}

	.container :global(.table-row:hover) {
		background: #f8f8f8;
	}
</style>
