export type Registation = {
	name: string;
	email: string;
	phone: string;
	password: string;
	birthday: string | undefined;
	avatar_img: string | ArrayBuffer | undefined;
};
export type Auth = {
	username: string;
	password: string;
};