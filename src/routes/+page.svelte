<script lang="ts">
	import { Table } from '$lib';
	import type { Column } from '$lib';
	import { sortByStringAttribute } from '$lib/sort';
	import { users, type User } from './createUser';

	const columns: Column<User>[] = [
		{
			name: 'id',
			value: 'id',
			isSortable: true,
			sortBy: sortByStringAttribute<User>('id') // This is the default sort
		},
		{
			name: 'username',
			value: (user) => user.username,
			isSortable: true,
			sortBy: sortByStringAttribute<User>((user: User) => user.username) // A function can be passed to sortByStringAttribute
		},
		{
			name: 'email',
			value: 'email'
		},
		{
			name: 'country',
			value: 'country'
		}
	];

	const rows: User[] = users;
</script>

<h1>Welcome to tavle</h1>

<Table {columns} {rows} areAllColumnsSortable={true}/>
