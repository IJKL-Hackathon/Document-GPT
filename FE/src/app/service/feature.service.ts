import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getSummary(fileId:any, userId:string): Observable<any> {
    let params = {
      fileId: fileId,
      userId: userId
    }

    return this.http.post<any>(`${this.apiUrl}/summarize`, params);
  }

  getQA(fileId:any, userId:string,query:string): Observable<any> {
    let params = {
      fileId: fileId,
      userId: userId,
      query: query
    }

    return this.http.post<any>(`${this.apiUrl}/qa`, params);
  }

  getQuizizz(fileId:any, userId:string): Observable<any> {
    let params = {
      fileId: fileId,
      userId: userId
    }

    return this.http.post<any>(`${this.apiUrl}/quizz`, params);
  }


  private storedData: any;
  getStoredSumData(): any {
    return this.storedData;
  }

  setStoreSumData(data: any): void {
    this.storedData = data;
  }

  private sumDataSubject = new BehaviorSubject<any>(null);
  setData(data: any) {
    this.sumDataSubject.next(data);
  }

  getData() {
    return this.sumDataSubject.asObservable();
  }
}
