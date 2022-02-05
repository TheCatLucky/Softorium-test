import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { authAPI } from "../../API/API";
import { logIn } from "../../Store/Reducers/Auth";
import style from "./SignIn.module.css";
type Props = {};
type Error = {
	text?: string;
};
export type Values = {
	username: string;
	password: string;
};
const SignIn: FC<Props> = () => {
	const dispatch = useDispatch();
	return (
		<div className={style.wrapper}>
			<h2 className={style.h2}>Авторизация</h2>
			<Formik
				initialValues={{ username: "", password: "" }}
				//				validate={(values) => {
				//					const errors: Error = {};
				//					let endValue = values.name.match(/^[а-яА-я]*/);
				//					//@ts-ignore
				//          values.text = endValue[0] || "";
				//					return errors;
				//				}}
				onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
					dispatch(logIn(values.username, values.password));
				}}
			>
				{({ isSubmitting }) => (
					<Form className={style.input}>
						<Field type="text" name="username" placeholder="Email" />
						<Field type="password" name="password" placeholder="Пароль" />
						<ErrorMessage name="text" component="div" className={style.error}></ErrorMessage>
						<button type="submit" disabled={isSubmitting}>
							Авторизоваться
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignIn;
