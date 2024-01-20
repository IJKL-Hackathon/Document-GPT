import { createAction, props } from "@ngrx/store";

export const uploadFile = createAction('[Upload] upload file',props<{ userid: string,fileupload:any }>()  )

export const uploadFileSuccess = createAction('[Upload] upload file success', props<{fileRes:any}>())

export const uploadFileFailure = createAction('[Upload] upload file error', props<{error:any}>());


export const getFile = createAction('[Upload] get file',props<{ userid: string }>() )

export const getFileSuccess = createAction('[Upload] get file success', props<{fileRes:any}>())

export const getFileFailure = createAction('[Upload] get file error', props<{error:any}>());


export const searchFiles = createAction('[File Search] Search Files', props<{ query: string,userid: string }>());
export const searchFilesSuccess = createAction('[File Search] Search Files Success', props<{ searchResults: any }>());
export const searchFilesFailure = createAction('[File Search] Search Files Failure', props<{ error: any }>());