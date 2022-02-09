import { ThunkType } from "../Reducers/Profile";
import { userAPI } from "./../../API/API";
export const actions = {
	setAuthUserData: (avatar: string, birthday: string, email: string, name: string, phone: string) =>
		({
			type: "SET_USER_DATA",
			payload: {
				avatar,
				birthday,
				email,
				name,
				phone,
			},
		} as const),
};

export const checkAuth = (): ThunkType => (dispatch) => {
	return userAPI.me().then(({ avatar, birthday, email, name, phone }) => {
		dispatch(actions.setAuthUserData(avatar, birthday, email, name, phone));
	});
};
