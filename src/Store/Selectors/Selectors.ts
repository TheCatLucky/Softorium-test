import { AppStateType } from "../Store";

export const getAuthState = (state: AppStateType) => state.auth;

export const getProfileState = (state: AppStateType) => state.profile;
