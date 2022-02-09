import { ThunkType } from "../Reducers/Auth";
import { authAPI } from "./../../API/API";
import { Auth, Registation } from "../../Common/Types/Types";
export const actions = {
	setIsAuth: (isAuth: boolean) =>
		({
			type: "SET_IS_AUTH",
			payload: {
				isAuth,
			},
		} as const),
	setError: (error: string) =>
		({
			type: "SET_ERROR",
			payload: {
				error,
			},
		} as const),
	setRegSuccess: (isRegSuccess: boolean) =>
		({
			type: "TOGGLE_REG",
			payload: {
				isRegSuccess,
			},
		} as const),
	toggleFetching: (isFethcing: boolean) =>
		({
			type: "TOGGLE_FETCHING",
			payload: {
				isFethcing,
			},
		} as const),
};

export const logIn = ({ username, password }: Auth): ThunkType => {
	return (dispatch) => {
		dispatch(actions.toggleFetching(true));
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		authAPI
			.login(formData)
			.then((data) => {
				if (Array.isArray(data.detail)) {
					dispatch(actions.setError("Введите логин и пароль"));
					dispatch(actions.toggleFetching(false));
					return;
				}
				if (data.access_token) {
					dispatch(actions.setIsAuth(true));
					dispatch(actions.toggleFetching(false));
				}
			})
			.catch(() => {
				dispatch(actions.toggleFetching(false));
				dispatch(actions.setError("Неизвестная ошибка"));
			});
	};
};

export const registration = (payload: Registation): ThunkType => {
	return (dispatch) => {
		dispatch(actions.toggleFetching(true));
		authAPI
			.registration(payload)
			.then((data) => {
				dispatch(actions.toggleFetching(false));
				if (typeof data.detail === "string") {
					dispatch(actions.setError(data.detail));
					return;
				}
				dispatch(actions.setRegSuccess(true));
			})
			.catch(() => {
				dispatch(actions.toggleFetching(false));
				dispatch(actions.setError("Загрузите фото меньшего объёма."));
			});
	};
};
