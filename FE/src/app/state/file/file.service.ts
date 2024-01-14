// upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { BASR_URL_API } from 'src/config/api';
import { searchFilesFailure, searchFilesSuccess, uploadFileFailure, uploadFileSuccess } from './file.action';


@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = BASR_URL_API; 
  // private header: HttpHeaders;
  constructor(private http: HttpClient, private store: Store) {
    // this.header = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
  }

  uploadFile(userid:any,fileupload:any) {
  const dataFile={
    userid:userid,
    fileupload:fileupload
  }
  console.log(fileupload);
  
  const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
    return this.http.post(`${this.apiUrl}/upload'`, dataFile,{ headers }).pipe(
      map((response) => {
        // Dispatch success action
        console.log("file successfully uploaded" , response);
        
          return uploadFileSuccess({fileRes:response});
      }),
      catchError((error)=>
      {
          return of(
              uploadFileFailure(
                  error.response && error.respone.data.message ? error.respone.data.message : error.message
              )
          )
      }
     )
    ).subscribe((action)=>this.store.dispatch(action));
}
getFile(userId:string) {
  const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
  let params = new HttpParams ()
      .set('userId', userId)

  return this.http.get(`${this.apiUrl}/getfile`,{ headers,params} ).pipe(
    map((response) => {
      // Dispatch success action
      console.log("file successfully get" , response);
      
        return uploadFileSuccess({fileRes:response});
    }),
    catchError((error)=>
    {
        return of(
            uploadFileFailure(
                error.response && error.respone.data.message ? error.respone.data.message : error.message
            )
        )
    }
   )
  ).subscribe((action)=>this.store.dispatch(action));
}
searchFiles(query:string,userId:string) {
  const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
  let params = new HttpParams()
      .set('query',query)
      .set('userId',userId)
  return this.http.get(`${this.apiUrl}/searchfile`,{ headers,params}).pipe(
    map((response) => {
      // Dispatch success action
      console.log("file successfully search" , response);
      
        return searchFilesSuccess({searchResults:response});
    }),
    catchError((error)=>
    {
        return of(
            searchFilesFailure(
                error.response && error.respone.data.message ? error.respone.data.message : error.message
            )
        )
    }
   )
  ).subscribe((action)=>this.store.dispatch(action));
}

  // private fileId:string []=[];
  private fileId = new BehaviorSubject<string[]>([]);
  saveFileId(fileSelected: string[]) {
    this.fileId.next(fileSelected);
  }

  removeFileId(fileToRemove: string) {
    const currentFileIds = this.fileId.value;
    
    const updatedFileIds = currentFileIds.filter(id => id !== fileToRemove);

    
    this.fileId.next(updatedFileIds);
  }

  getFileId(): Observable<string[]> {
    return this.fileId.asObservable();
  }
  
}
