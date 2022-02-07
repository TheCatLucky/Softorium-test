import { Values } from "../../Components/SignUp/SignUp";

type Error = {
	name?: string;
	email?: string;
	phone?: string;
	password?: string;
};
export const signUpValidate = (values:Values) => {
	const errors: Error = {};
	const phoneReg = /^(8|\+?7-?){1}(\(?\d{3}\)?-?)(-?\d{3}-?\d{2}-?\d{2})$/;
	if (!phoneReg.test(values.phone)) {
		errors.phone = "Неверный формат номера";
	}
	if (values.name.length > 30) {
		errors.name = "Слишком длинное Имя и/или Фамилия";
	}
	if (!values.name) {
		errors.name = "Введите имя";
	}
	if (!values.email) {
		errors.email = "Введите email";
	}
	if (!values.password) {
		errors.password = "Введите пароль";
	}
	return errors;
};