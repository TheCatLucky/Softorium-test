import ru from "date-fns/locale/ru";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, FC, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { dateConversion } from "../../Helpers/time";
import { actions, registration } from "../../Store/Reducers/Auth";
import { AppStateType } from "../../Store/Store";
import { signUpValidate } from "./../../Common/Validators/SignUpValidate";
import arrow from "./../../Icons/arrowleft.svg";
import download from "./../../Icons/download.svg";
import style from "./SignUp.module.css";
registerLocale("ru", ru);
export type Values = {
	name: string;
	email: string;
	phone: string;
	password: string;
};
const SignUp: FC = () => {
	const [date, setDate] = useState<Date | null>(null);
	const [fileName, setFileName] = useState("");
	const [photo, setPhoto] = useState<string | ArrayBuffer | undefined>(undefined);
	const authError = useSelector((state: AppStateType) => state.auth.error);
	const isRegSuccess = useSelector((state: AppStateType) => state.auth.isRegSuccess);
	const isFetching = useSelector((state: AppStateType) => state.auth.isFethcing);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.setError(""));
	}, []);
	const handleRegSubmit = ({ name, email, phone, password }: Values) => {
    const birthday = dateConversion(date);
		dispatch(registration({name, email, phone, password, birthday, avatar_img:photo}));
	};
	if (isRegSuccess) {
		return <Navigate to="/" />;
	}
	const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
		let reader = new FileReader();
		//@ts-ignore
    let file = e.target.files[0];
		if (file.name.length > 17) {
			setFileName(file.name.slice(0, 9) + "..." + file.name.slice(-7));
		} else {
			setFileName(file.name.slice(0, 17));
		}
		reader.onloadend = () => {
			setPhoto(reader.result?.slice(22));
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<NavLink to="/">
					<img src={arrow} alt="back to auth" className={style.back} />
				</NavLink>
				<h2 className={style.h2}>Регистрация</h2>
				<Formik
					initialValues={{ name: "", email: "", phone: "", password: "" }}
					validate={(values) => signUpValidate(values)}
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
							<input
								id="file"
								type={"file"}
								onChange={handlePhoto}
								accept="image/*"
								className={style.fileInput}
							/>
							<label htmlFor="file" className={style.fileInputLabel}>
								<img src={download} alt="download" className={style.download} />
								{fileName || "Выбрать фотографию"}
							</label>
							<DatePicker
								selected={date}
								onChange={(date: Date) => setDate(date)}
								dateFormat="yyyy/MM/dd"
								required
								showMonthDropdown
								showYearDropdown
								dropdownMode="select"
								fixedHeight
								locale="ru"
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
