import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { FC, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { actions, logIn } from "../../Store/Reducers/Auth";
import { AppStateType } from "../../Store/Store";
import style from "./SignIn.module.css";


const SignIn: FC = () => {
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
	const authError = useSelector((state: AppStateType) => state.auth.error);
	const isFetching = useSelector((state: AppStateType) => state.auth.isFethcing);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.setRegSuccess(false));
		dispatch(actions.setError(""));
	}, []);
	if (!localStorage.getItem("X-APP-ID")) {
		localStorage.setItem("X-APP-ID", nanoid());
	}
	if (isAuth) {
		return <Navigate to={"/profile"} />;
	}
	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<h2 className={style.h2}>Авторизация</h2>
				<Formik
					initialValues={{ username: "", password: "" }}
					onSubmit={(values) => {
						dispatch(logIn(values));
					}}
				>
					{() => (
						<Form className={style.input}>
							<Field type="text" name="username" placeholder="Логин" />
							<Field type="password" name="password" placeholder="Пароль" />
							<button type="submit" disabled={isFetching}>
								Авторизоваться
							</button>
							{authError && <p className={style.responseError}>{authError}</p>}
						</Form>
					)}
				</Formik>
				<div className={style.navlink}>
					<NavLink to="/signUp">Зарегистрироваться</NavLink>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
