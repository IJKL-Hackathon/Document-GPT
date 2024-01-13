import { createReducer, on } from "@ngrx/store"
import { getFile, getFileFailure, getFileSuccess, searchFiles, searchFilesFailure, searchFilesSuccess, uploadFile, uploadFileFailure, uploadFileSuccess } from "./file.action"


const initialState={
    fileRes:null,
    loading:false,
    error:null  
}

export const FileReducer= createReducer(
    initialState,
    on(uploadFile, (state) => ({ ...state, loading: true, error: null })),
    on(uploadFileSuccess, (state, { fileRes }) => ({ ...state, fileRes:fileRes, loading: false, error: null })),
    on(uploadFileFailure, (state,{error})=>({...state, loading:false, error:error})),

  on(searchFiles, (state) => ({ ...state, loading: true, error: null })),
  on(searchFilesSuccess, (state, { searchResults }) => ({ ...state, searchResults:searchResults, loading: false, error: null })),
  on(searchFilesFailure, (state,{error})=>({...state, loading:false, error:error})),


  on(getFile, (state) => ({ ...state, loading: true, error: null })),
  on(getFileSuccess, (state, { fileRes }) => ({ ...state, fileRes:fileRes, loading: false, error: null })),
  on(getFileFailure, (state,{error})=>({...state, loading:false, error:error}))
)