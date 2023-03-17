import { faker } from '@faker-js/faker';

export interface User {
	id: string;
	username: string;
	email: string;
	avatar: string;
	birthdate: string;
	country: string;
	registeredAt: string;
}

export function createRandomUser(): User {
	return {
		id: faker.datatype.uuid(),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		avatar: faker.image.avatar(),
		birthdate: faker.date.birthdate().toISOString().split('T')[0],
		country: faker.address.country(),
		registeredAt: faker.date.past().toISOString().split('T')[0]
	};
}

export const users: User[] = Array(10).fill(0).map(createRandomUser);
