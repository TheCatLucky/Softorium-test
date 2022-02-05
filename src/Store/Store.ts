import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";
import appReducer from "./Reducers/App";
import authReducer from "./Reducers/Auth";

const rootReducer = combineReducers({
	auth: authReducer,
	app: appReducer,
});
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;
export type BaseThunkType<A extends Action, R = void> = ThunkAction<R, AppStateType, unknown, A>;
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export default store;
