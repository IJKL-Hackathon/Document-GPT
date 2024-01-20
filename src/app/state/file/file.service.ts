// upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as FormData from 'form-data';
import { BASR_URL_API } from 'src/config/api';
import {
  searchFilesFailure,
  searchFilesSuccess,
  uploadFileFailure,
  uploadFileSuccess,
} from './file.action';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = BASR_URL_API;
  // private header: HttpHeaders;
  constructor(private http: HttpClient, private store: Store) {
    // this.header = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`);
  }

  uploadFile(userid: any, fileupload: any) {
    const form = new FormData();

    console.log(fileupload);
    form.append('file', fileupload);
    form.append('userid', userid);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('jwt')}`
    );
    return this.http
      .post<any>(`${this.apiUrl}/upload`, form, { headers })
      .pipe(
        map((response) => {
          // Dispatch success action
          console.log('file successfully uploaded', response);

          return uploadFileSuccess({ fileRes: response });
        }),
        catchError((error) => {
          return of(
            uploadFileFailure(
              error.response && error.respone.data.message
                ? error.respone.data.message
                : error.message
            )
          );
        })
      )
  }
  getFile(userId: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('jwt')}`
    );
    let params = new HttpParams().set('userId', userId);

    return this.http
      .get(`${this.apiUrl}/getfile`, { headers, params });
      // .pipe(
      //   map((response) => {
      //     // Dispatch success action
      //     console.log('file successfully get', response);

      //     return uploadFileSuccess({ fileRes: response });
      //   }),
      //   catchError((error) => {
      //     return of(
      //       uploadFileFailure(
      //         error.response && error.respone.data.message
      //           ? error.respone.data.message
      //           : error.message
      //       )
      //     );
      //   })
      // )
      // .subscribe((action) => this.store.dispatch(action));
  }
  searchFiles(query: string, userId: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('jwt')}`
    );
    let params = new HttpParams().set('query', query).set('userId', userId);
    return this.http
      .get(`${this.apiUrl}/searchfile`, { headers, params })
      .pipe(
        map((response) => {
          // Dispatch success action
          console.log('file successfully search', response);

          return searchFilesSuccess({ searchResults: response });
        }),
        catchError((error) => {
          return of(
            searchFilesFailure(
              error.response && error.respone.data.message
                ? error.respone.data.message
                : error.message
            )
          );
        })
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  private fileId: string = '';
  saveFileId(Id: string) {
    return (this.fileId = Id);
  }
  getFileId() {
    return this.fileId;
  }

  // getFileId(): Observable<string[]> {
  //   return this.fileId.asObservable();
  // }
  selectedFileIds: string[] = [];
  updateSelectedFileIds(id: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedFileIds.push(id);
    } else {
      this.selectedFileIds = this.selectedFileIds.filter((fileId) => fileId !== id);
    }
  }
  
}
