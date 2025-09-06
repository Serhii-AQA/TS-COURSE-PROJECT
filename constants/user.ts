import { UserRegisterBody } from '../typings/user';
import { faker } from '@faker-js/faker';


export const userData: UserRegisterBody = {
	first_name: faker.person.firstName(),
	last_name: faker.person.lastName(),
	address: {
		street: faker.location.street(),
		city: faker.location.city(),
		state: faker.location.state(),
		country: faker.location.country(),
		postal_code: faker.location.zipCode('#####'),
	},
	phone: faker.phone.number({ style: 'international' }),
	dob: faker.date.birthdate({ mode: 'age', min: 18, max: 65 }).toISOString().split('T')[0],
	password: 'SuperSecure@123',
	email: `test+${new Date().getTime().toString()}@example.com`,
};
