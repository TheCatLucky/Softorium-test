import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../Store/Actions/ProfileActions";
import { getProfileState } from "../../Store/Selectors/Selectors";
import { AppStateType } from "../../Store/Store";
import style from "./Profile.module.css";

const Profile: FC = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const { avatar, birthday, email, name, phone } = useSelector(getProfileState);
	useEffect(() => {
		dispatch(checkAuth());
	}, []);
	if (!isAuth) {
		return <Navigate to={"/"} />;
	}
	return (
		<div className={style.wrapper}>
			<div className={style.content}>
				<img className={style.img} src={avatar!} alt="avatar" />
				<div className={style.column}>
					<h2 className={style.name}>{name}</h2>
					<p>Почта: {email}</p>
					<p>Телефон: {phone}</p>
					<p>День рождения: {birthday}</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
