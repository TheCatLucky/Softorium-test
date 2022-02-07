import { userAPI } from "./../../API/API";
import { BaseThunkType, InferActionsTypes } from "./../Store";

type InitialStateType = typeof initialState;

const initialState = {
	avatar: undefined as string | undefined,
	birthday: null as string | null,
	email: null as string | null,
	name: null as string | null,
	phone: null as string | null,
};

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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

export default profileReducer;
