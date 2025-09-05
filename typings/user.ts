export interface UserLoginBody {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}