export interface UserLoginBody {
	email: string;
	password: string;
}

export interface UserLoginResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
}

export interface UserRegisterBody {
	first_name: string;
	last_name: string;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		postal_code: string;
	},
	phone: string;
	dob: string;
	password: string;
	email: string;
}

export interface UserRegisterResponse {
	first_name: string;
	last_name: string;
	address: {
		street: string;
		city: string;
		state: string;
		country: string;
		postal_code: string;
	},
	phone: string;
	dob: string;
	email: string;
	id: string;
	provider: string;
	totp_enabled: boolean,
	enabled: boolean,
	failed_login_attempts: number
	created_at: string;
}
