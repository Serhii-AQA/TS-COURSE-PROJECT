import { test as base, expect } from '@playwright/test';
import { Application } from './pages/app';
import { USER_EMAIL, USER_PASSWORD } from './config/baseConfig';
import { UserLoginBody, UserLoginResponse, UserRegisterBody, UserRegisterResponse } from './typings/user';
import { ApiEndpoints } from './constants/apiEndpoints';
import { WebRoutes } from './constants/webRoutes';
import { userData } from './constants/user';

interface UserContext {
	user: {
		userModel: UserRegisterBody; //user body
		createdUser: UserRegisterResponse // register user response
	}
}

type MyFixtures = {
	app: Application;
	loggedInUser: Application;
	loggedInAsNewUser: UserContext;
};

export const test = base.extend<MyFixtures>({
	app: async ({ page }, use) => {
		const app = new Application(page);
		await use(app);
	},

	loggedInUser: async ({ app, request, page }, use) => {
		const { email, password }: UserLoginBody = {
			email: USER_EMAIL,
			password: USER_PASSWORD
		};

		const response = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
			data: {
				email,
				password,
			}
		});
		expect(response.ok()).toBeTruthy();

		const responseBody = await response.json() as UserLoginResponse;
		await page.goto(WebRoutes.Home, { waitUntil: 'commit' });

		await page.evaluate((token) => {
			return window.localStorage.setItem('auth-token', token);
		}, responseBody.access_token);

		await app.homePage.navigateTo(WebRoutes.Home);

		await use(app);
	},

	loggedInAsNewUser: async ({ app, request, page }, use) => {
		const user = userData;
		const createUserResponse = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersRegister}`, {
			data: user,
		});

		expect(createUserResponse.ok()).toBeTruthy();

		const createUserResponseBody = await createUserResponse.json() as UserRegisterResponse;

		await test.info().attach('Credentials used for user registration',
			{
				body: JSON.stringify(user, null, 4),
				contentType: 'application/json'
			},
		);

		const loginUserResponse = await request.post(`${ApiEndpoints.ApiBase}${WebRoutes.UsersLogin}`, {
			data: {
				email: user.email,
				password: user.password,
			}
		});
		expect(loginUserResponse.ok()).toBeTruthy();

		const loginUserResponseBody = await loginUserResponse.json() as UserLoginResponse;

		await page.goto(WebRoutes.Home, { waitUntil: 'commit' });

		await page.evaluate((token) => {
			return window.localStorage.setItem('auth-token', token);
		}, loginUserResponseBody.access_token);

		await app.homePage.navigateTo(WebRoutes.Home);

		await use({
			user: {
				userModel: user,
				createdUser: createUserResponseBody,
			}
		});

		// post condition
		await request.delete(`${ApiEndpoints.ApiBase}${WebRoutes.Users}/${createUserResponseBody.id}`, {
			headers: {
				Authorization: `Bearer ${loginUserResponseBody.access_token}`
			}
		});
	},
});
