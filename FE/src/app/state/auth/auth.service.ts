import { Injectable } from "@angular/core";
import { BASR_URL_API } from "src/config/api";
import {HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from "./auth.action";
@Injectable({
    providedIn: 'root',
})

export class AuthService{
    private apiUrl=BASR_URL_API+'/auth';
    
    constructor(private http: HttpClient, private store:Store){}

    login(Datalogin:any){
       return this.http.post(`${this.apiUrl}/signin`,Datalogin).pipe(
        map((user:any) =>{
            console.log(user);
            if(user.jwt){
                localStorage.setItem("jwt",user.jwt);
            }
            return loginSuccess(user);
        }   
        ),
        catchError((error)=>
         {
             return of(
                 loginFailure(
                     error.response && error.respone.data.message ? error.respone.data.message : error.message
                 )
             )
         }
        )
       ).subscribe((action)=>this.store.dispatch(action));
    }

    register(Dataregister:any){
        return this.http.post(`${this.apiUrl}/signup`,Dataregister).pipe(
         map((user:any) =>{
             console.log(user);
             if(user.jwt){
                 localStorage.setItem("jwt",user.jwt);
             }
             return registerSuccess(user);
         }   
         ),
         catchError((error)=>
          {
              return of(
                  registerFailure(
                      error.response && error.respone.data.message ? error.respone.data.message : error.message
                  )
              )
          }
         )
        ).subscribe((action)=>this.store.dispatch(action));
     }
}