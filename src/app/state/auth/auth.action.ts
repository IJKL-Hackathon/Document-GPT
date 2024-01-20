import { createAction,props } from "@ngrx/store";

export const login = createAction('[Auth] login', props<{email:string,password:string}>())

export const loginSuccess = createAction('[Auth] loginSuccess', props<{user:any}>());

export const loginFailure = createAction('[Auth] loginFailure', props<{error:any}>());

export const register = createAction('[Auth] login', props<{user:any}>())

export const registerSuccess = createAction('[Auth] registerSuccess', props<{user:any}>());

export const registerFailure = createAction('[Auth] registerFailure', props<{error:any}>());