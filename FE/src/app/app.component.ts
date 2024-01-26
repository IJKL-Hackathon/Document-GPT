import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './state/user/user.service';
import { AppState } from './models/AppState';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { getLocaleMonthNames } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Arzue_Hackathon';
  routePath: string = '';
  showExtraContent: boolean= true;
  showAuth: boolean= true;
  constructor(private diaolog:MatDialog, private userService:UserService, private store:Store<AppState>,
    private activatedRoute: ActivatedRoute, private router:Router
    ){
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const path = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
          if (path === '') {
            this.showAuth = false;
          } else {
            // Kiểm tra nếu path không chứa 'share'
            this.showExtraContent = !path?.includes('share') ?? true;
    
            // Mặc định showAuth là true nếu không phải trang mặc định
            this.showAuth = true;
          }
        }
        // console.log(this.showExtraContent);
        
      });
  }
  ngOnInit() {


    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store)=>store.auth)).subscribe((user)=>{
      this.userService.getUserProfile();
  
      console.log("log user appmodule:" ,user);
      console.log("userprofile appmodule:" ,user.userProfile);
    });


      
      

}
}
