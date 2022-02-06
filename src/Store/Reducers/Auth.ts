import { authAPI } from "./../../API/API";
import { BaseThunkType, InferActionsTypes } from "./../Store";

type InitialStateType = typeof initialState;

const initialState = {
	isAuth: false as boolean,
	error: null as string | null,
	isRegSuccess: false as boolean,
	isFethcing: false as boolean,
};

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case "SET_IS_AUTH":
			return {
				...state,
				...action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				...action.payload,
			};
		case "SET_REG":
			return {
				...state,
				...action.payload,
			};
		case "TOGGLE_FETCHING":
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
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
			type: "SET_REG",
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

export const logIn = (username: string, password: string): ThunkType => {
	return (dispatch) => {
		dispatch(actions.toggleFetching(true));
		const formData = new FormData();
		formData.append("username", username);
		formData.append("password", password);
		authAPI
			.login(formData)
      .then((data) => {
				if (typeof data.detail === "string") {
          dispatch(actions.setError(data.detail));
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

export const registration = (
	name: string,
	email: string,
	phone: string,
	password: string,
	birthday: string,
	avatar_img: string | ArrayBuffer | undefined
): ThunkType => {
	return (dispatch) => {
		dispatch(actions.toggleFetching(true));
		authAPI
			.registration(name, email, phone, password, birthday, avatar_img)
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
export default authReducer;
