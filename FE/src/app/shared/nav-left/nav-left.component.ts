import { Component } from '@angular/core';
import { res } from 'src/Data/res_file';
import {MatDialog} from '@angular/material/dialog'
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/AppState';
@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {
  res_file: any[] = [];
  selectedFile: File | null = null;
  UserProfile: any;
  constructor(private diaolog:MatDialog, private userService:UserService, private store:Store<AppState>){

  }
  ngOnInit() {
    this.res_file = res;
    console.log(this.res_file);

    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProflie();
    }
    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.UserProfile=user.userProfile;
      if(this.UserProfile)
      {
        this.diaolog.closeAll();
      }
      console.log("user:" ,user);
      console.log("userprofile:" ,user.userProfile);
    });

    
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  onSubmit() {
    if (this.selectedFile) {
      
      console.log('File selected:', this.selectedFile);
      
    }}

  HandleLogin(){ this.diaolog.open(AuthComponent,{
   
    })
    
    }

    isMenuOpen: boolean = false;

  toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
     }

    logout(){
      this.userService.logout();
    }
}
