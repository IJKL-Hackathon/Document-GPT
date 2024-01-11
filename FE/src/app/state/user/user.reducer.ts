import { createReducer, on } from "@ngrx/store";
import { getUserProfile, getUserProfileFailure, getUserProfileSuccess, logoutSucess } from "./user.action";

const initialState = {
    userProfile:null,
    loading:false,
    error:null    
}
export const UserReducer = createReducer(
    initialState,
    on(getUserProfile,(state)=>({...state, loading:true, error:null})),
    on(getUserProfileSuccess,(state,{userProfile})=>({...state, loading:true, error:null,userProfile})),
    on(getUserProfileFailure,(state,{error})=>({...state, loading:false, error:error})),

    on(logoutSucess,()=>initialState)


   

)