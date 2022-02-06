import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { actions, registration } from "../../Store/Reducers/Auth";
import { AppStateType } from "../../Store/Store";
import style from "./SignUp.module.css";
type Error = {
	name?: string;
	email?: string;
	phone?: string;
	password?: string;
};
export type Values = {
	name: string;
	email: string;
	phone: string;
	password: string;
};
const SignUp: FC = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [photo, setPhoto] = useState<string | ArrayBuffer | undefined>(undefined);
	const authError = useSelector((state: AppStateType) => state.auth.error);
	const isRegSuccess = useSelector((state: AppStateType) => state.auth.isRegSuccess);
	const isFetching = useSelector((state: AppStateType) => state.auth.isFethcing);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.setError(""));
	}, []);
	const handleRegSubmit = ({ name, email, phone, password }: Values) => {
		let d: string | number = date.getDate();
		let m: string | number = date.getMonth() + 1;
		let y: string | number = date.getFullYear();
		if (m <= 9) {
			m = `0${m}`;
		}
		if (d < 9) {
			d = `0${d}`;
		}
		let birthday = `${y}-${m}-${d}`;

		dispatch(registration(name, email, phone, password, birthday, photo));
	};
	if (isRegSuccess) {
		return <Navigate to="/" />;
	}
	const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
		let reader = new FileReader();
		//@ts-ignore
		let file = e.target.files[0];
		reader.onloadend = () => {
			setPhoto(reader.result?.slice(22));
		};
		reader.readAsDataURL(file);
	};
	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<h2 className={style.h2}>Регистрация</h2>
				<Formik
					initialValues={{ name: "", email: "", phone: "", password: "" }}
					validate={(values) => {
						const errors: Error = {};
						const phoneReg = /^(8|\+?7-?){1}(\(?\d{3}\)?-?)(-?\d{3}-?\d{2}-?\d{2})$/;
						if (!phoneReg.test(values.phone)) {
							errors.phone = "Неверный формат номера";
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
					}}
					onSubmit={(values) => {
						handleRegSubmit(values);
					}}
				>
					{() => (
						<Form className={style.input}>
							<Field type="text" name="name" placeholder="Имя и/или Фамилия" />
							<ErrorMessage name="name" component="span" className={style.error} />
							<Field type="email" name="email" placeholder="Email" />
							<ErrorMessage name="email" component="span" className={style.error} />
							<Field type="text" name="phone" placeholder="Телефон" />
							<ErrorMessage name="phone" component="span" className={style.error} />
							<Field type="password" name="password" placeholder="Пароль" />
							<ErrorMessage name="password" component="span" className={style.error} />
							<input type={"file"} onChange={handlePhoto} />
							<DatePicker
								selected={date}
								onChange={(date: Date) => setDate(date)}
                dateFormat="yyyy/MM/dd"
                required
                placeholderText="Дата рождения"
								maxDate={new Date()}
							/>
							<button type="submit" disabled={isFetching}>
								Зарегистрироваться
							</button>
							{authError && <p className={style.responseError}>{authError}</p>}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default SignUp;
