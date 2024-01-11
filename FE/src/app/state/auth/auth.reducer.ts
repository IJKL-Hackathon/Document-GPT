import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from "./auth.action";

const initialState = {
    user:null,
    loading:false,
    error:null    
}
export const AuthReducer = createReducer(
    initialState,
    on(login,(state)=>({...state, loading:true, error:null})),
    on(loginSuccess,(state,{user})=>({...state, loading:true, error:null,user:user})),
    on(loginFailure,(state,{error})=>({...state, loading:false, error:error})),



    on(register,(state)=>({...state, loading:true, error:null})),
    on(registerSuccess,(state,{user})=>({...state, loading:true, error:null,user:user})),
    on(registerFailure,(state,{error})=>({...state, loading:false, error:error}))

)