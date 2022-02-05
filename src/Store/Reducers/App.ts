import { checkAuth } from "./Auth";
import { BaseThunkType, InferActionsTypes } from "./../Store";

type InitialStateType = typeof initialState;
let initialState = {
	initialized: false,
};
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
const appReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "SET_INITIALIZE":
			return {
				...state,
				initialized: true,
			};
		default:
			return state;
	}
};
const actions = {
	initializedSuccess: () => ({ type: "SET_INITIALIZE" } as const),
};

export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(checkAuth());
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess());
	});
};

export default appReducer;
