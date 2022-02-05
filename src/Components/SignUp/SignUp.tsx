import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { authAPI } from "../../API/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./SignUp.module.css";
type Props = {};
type Error = {
	text?: string;
};
export type Values = {
	name: string;
	email: string;
	phone: string;
	password: string;
};
const SignUp: FC<Props> = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [photo, setPhoto] = useState<any>(null);
	const dispatch = useDispatch();
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

		dispatch(authAPI.registration(name, email, phone, password, birthday,photo));
	};
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
			<h2 className={style.h2}>Регистрация</h2>
			<Formik
				initialValues={{ name: "", email: "", phone: "", password: "" }}
				//				validate={(values) => {
				//					const errors: Error = {};
				//					let endValue = values.name.match(/^[а-яА-я]*/);
				//					//@ts-ignore
				//          values.text = endValue[0] || "";
				//					return errors;
				//				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					handleRegSubmit(values);
				}}
			>
				{({ isSubmitting }) => (
					<Form className={style.input}>
						<Field type="text" name="name" placeholder="Имя и/или Фамилия" />
						<Field type="email" name="email" placeholder="Email" />
						<Field type="text" name="phone" placeholder="Телефон" />
						<Field type="password" name="password" placeholder="Пароль" />
						<input type={"file"} onChange={handlePhoto} />
						<ErrorMessage name="text" component="div" className={style.error}></ErrorMessage>
						<DatePicker
							selected={date}
							onChange={(date: any) => setDate(date)}
							dateFormat="yyyy/MM/dd"
							maxDate={new Date()}
						/>
						<button type="submit" disabled={isSubmitting}>
							Зарегистрироваться
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignUp;
