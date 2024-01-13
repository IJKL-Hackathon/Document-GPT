import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASR_URL_API } from 'src/config/api';

@Injectable({
  providedIn: 'root',
})
export class FeaturService {
  private apiUrl = BASR_URL_API;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    });
  }

  getSummary(option:string,fileId:any, userId:string): Observable<any> {
    let params = new HttpParams ()
      .set('option', option)
      .set('fileId',fileId)
      .set('userId',userId)
 
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/sum`, { headers,params });
  }

  getQA(option:string,fileId:any, userId:string,query:string): Observable<any> {
    let params = new HttpParams ()
      .set('option', option)
      .set('fileId',fileId)
      .set('userId',userId)
      .set('query',query)
    
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/qa`, { headers,params });
  }

  getQuizizz(option:string,fileId:any, userId:string): Observable<any> {
    let params = new HttpParams ()
      .set('option', option)
      .set('fileId',fileId)
      .set('userId',userId)

    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/quizz`, { headers,params });
  }
}
