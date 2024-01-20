import { createAction,props } from "@ngrx/store";

export const getUserProfile = createAction('[User] getUser')

export const getUserProfileSuccess = createAction('[User] getUserSuccess', props<{userProfile:any}>());

export const getUserProfileFailure = createAction('[User] getUserFailure', props<{error:any}>());

export const logoutSucess = createAction('[User] LogoutSucess')