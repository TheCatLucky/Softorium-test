import { actions } from "../Actions/ProfileActions";
import { BaseThunkType, InferActionsTypes } from "./../Store";

const initialState: Profile = {
	avatar: null,
	birthday: null,
	email: null,
	name: null,
	phone: null,
};

interface Profile {
	avatar: string | null;
	birthday: string | null;
	email: string | null;
	name: string | null;
	phone: string | null;
}
type ActionsType = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsType>;
const profileReducer = (state: Profile = initialState, action: ActionsType): Profile => {
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

export default profileReducer;
