import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './state/user/user.service';
import { AppState } from './models/AppState';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arzue_Hackathon';
  constructor(private diaolog:MatDialog, private userService:UserService, private store:Store<AppState>){

  }
  ngOnInit() {


    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProflie();
    }
    this.store.pipe(select((store)=>store.auth)).subscribe((user)=>{
      this.userService.getUserProflie();
  
      console.log("log user appmodule:" ,user);
      console.log("userprofile appmodule:" ,user.userProfile);
    });
}
}
