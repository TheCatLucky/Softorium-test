import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { Auth } from "../../Common/Types/Types";
import { actions, logIn } from "../../Store/Actions/AuthActions";
import { getAuthState } from "../../Store/Selectors/Selectors";
import style from "./Authorization.module.css";

const Authorization: FC = () => {
	const { error, isAuth, isFethcing } = useSelector(getAuthState);
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
	const handleLogin = (values: Auth) => {
		dispatch(logIn(values));
	};
	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<h2 className={style.h2}>Авторизация</h2>
				<Formik initialValues={{ username: "", password: "" }} onSubmit={handleLogin}>
					{() => (
						<Form className={style.input}>
							<Field type="text" name="username" placeholder="Логин" />
							<Field type="password" name="password" placeholder="Пароль" />
							<button type="submit" disabled={isFethcing}>
								Авторизоваться
							</button>
							{error && <p className={style.responseError}>{error}</p>}
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

export default Authorization;
