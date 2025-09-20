export interface registerType {
	message: string;
	user: User;
	token: string;
}

export interface User {
	name: string;
	email: string;
	role: string;
}

export interface RegisterErrorType {
	message: string;
	name: string;
	stack: string;
	config: Config;
	code: string;
	status: number;
	response: RESPONSE;
}

export interface Config {
	transitional: Transitional;
	adapter: string[];

	timeout: number;
	xsrfCookieName: string;
	xsrfHeaderName: string;
	maxContentLength: number;
	maxBodyLength: number;
	headers: Headers;
	method: string;
	url: string;
	data: string;
	allowAbsoluteUrls: boolean;
}

export interface Transitional {
	silentJSONParsing: boolean;
	forcedJSONParsing: boolean;
	clarifyTimeoutError: boolean;
}

export interface Headers {
	Accept: string;
	"Content-Type": string;
}

export type RESPONSE = {
	data: {
		statusMsg: string;
		message: string;
	};
	status: number;
	statusText: string;
	headers: {
		"content-length": string;
		"content-type": string;
	};
	config: {
		transitional: {
			silentJSONParsing: boolean;
			forcedJSONParsing: boolean;
			clarifyTimeoutError: boolean;
		};
		adapter: Array<string>;

		timeout: number;
		xsrfCookieName: string;
		xsrfHeaderName: string;
		maxContentLength: number;
		maxBodyLength: number;
		env: object;
		headers: {
			Accept: string;
			"Content-Type": string;
		};
		method: string;
		url: string;
		data: string;
		allowAbsoluteUrls: boolean;
	};
	request: object;
};
