import { actions } from "../Actions/AuthActions";
import { BaseThunkType, InferActionsTypes } from "./../Store";

type InitialStateType = typeof initialState;

const initialState = {
	isAuth: false as boolean,
	error: null as string | null,
	isRegSuccess: false as boolean,
	isFethcing: false as boolean,
};

type ActionsType = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsType>;
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
		case "TOGGLE_REG":
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

export default authReducer;
