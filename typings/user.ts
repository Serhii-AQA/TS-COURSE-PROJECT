import { USER_EMAIL, USER_PASSWORD } from '../config/baseConfig';

export interface UserLoginBody {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}