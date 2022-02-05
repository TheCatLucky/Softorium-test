import { authAPI, userAPI } from "./../../API/API";
import { BaseThunkType, InferActionsTypes } from "./../Store";

type InitialStateType = typeof initialState;

const initialState = {
	email: null as string | null,
	isAuth: false as boolean,
};

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType >;
const authReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
const actions = {
	setAuthUserData: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: "SET_USER_DATA",
			payload: {
				userId,
				email,
				login,
				isAuth,
			},
		} as const),
};

export const checkAuth = (): ThunkType => (dispatch) => {
	return userAPI.me().then((data) => {
/* 		if (data.resultCode === ResultCodesEnum.Success) {
			let { id, login, email } = data.data;
			dispatch(actions.setAuthUserData(id, email, login, true));
		} */
    console.log(data);
	});
};

/* export const logIn =(formData:FormData): ThunkType =>
	(dispatch) => {
    authAPI.login(formData).then((data) => {
      console.log("asd");
			 if (data.access_token) {
				dispatch(checkAuth());
			}
		});
	}; */
export const logIn = (username: string, password: string): ThunkType => {
  return (dispatch) => {
    console.log(username);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    authAPI.login(formData).then((data) => {
      console.log("asd");
      if (data.access_token) {
        dispatch(checkAuth());
      }
    });
  };
};


export default authReducer;
