import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AppState } from 'src/app/models/AppState';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  UserProfile: any;
  constructor(private diaolog:MatDialog, private userService:UserService, 
    private store:Store<AppState>, private router:Router) {

  }
  ngOnInit() {


    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.UserProfile=user.userProfile;
      // if(this.UserProfile)
      // {
      //   this.diaolog.closeAll();
      // }
      // console.log("user:" ,user);
      // console.log("userprofile:" ,user.userProfile);
    });
  }

  navigateTo(router:string){
    if(!this.UserProfile)
    {
      this.diaolog.open(AuthComponent,{
   
      })
    }
    else{
      this.router.navigate([router]);
    }
  }
}
