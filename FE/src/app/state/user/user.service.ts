import { Injectable } from "@angular/core";
import { BASR_URL_API } from "src/config/api";
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { catchError, map, of } from "rxjs";
import { getUserProfileFailure, getUserProfileSuccess, logoutSucess } from "./user.action";

@Injectable({
    providedIn: 'root',
})

export class UserService{
    private apiUrl=BASR_URL_API+'/profile';
    private header:HttpHeaders;
    constructor(private http: HttpClient, private store:Store){
        this.header=new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem("jwt")}`)
    }

    getUserProflie(){
 
       return this.http.post(`${this.apiUrl}/profile`,{},{headers:this.header}).pipe(
        map((user:any) =>{
            console.log("get userProfile Success",user);
           
            return getUserProfileSuccess({userProfile:user});
        }   
        ),
        catchError((error)=>
         {
             return of(
                 getUserProfileFailure(
                     error.response && error.respone.data.message ? error.respone.data.message : error.message
                 )
             )
         }
        )
       ).subscribe((action)=>this.store.dispatch(action));
    }

    logout(){
        localStorage.removeItem("jwt");
        this.store.dispatch(logoutSucess());
      }
}