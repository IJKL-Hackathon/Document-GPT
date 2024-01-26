import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASR_URL_API } from 'src/config/api';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private apiUrl = BASR_URL_API;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt'); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    });
  }

  getHistory(userId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    // let params = {
    //   userId: userId
    // }
    return this.http.get<any>(`${this.apiUrl}/quizz/history`, {params });
  }
  testAgain(userId:string, quizzId:string[]): Observable<any> {
    let params = {
        userId: userId,
        quizzIds: quizzId
      }
    return this.http.post<any>(`${this.apiUrl}/quizz/test`, params);
  }
  getLinkShare(userId:string, quizzId:string[]): Observable<any> {
    let params = {
        userId: userId,
        quizzIds: quizzId
      }
    return this.http.post<any>(`${this.apiUrl}/quizz/link`, params);
  }
  getQuizzShare(id:string){
    let params = {
      id:id
    }
    return this.http.post<any>(`${this.apiUrl}/quizz/share`, params);
  }
  private quizzTestAgain = new BehaviorSubject<any>(null);
  setQuizzTestAgain(data: any) {
    this.quizzTestAgain.next(data);
  }

  getQuizzTestAgain() {
    return this.quizzTestAgain.asObservable();
  }
  
}
