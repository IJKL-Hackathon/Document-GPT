import {Component, Input, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/state/auth/auth.service';

import {UserService} from "../state/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../models/AppState";
import {NavLeftComponent} from "../shared/nav-left/nav-left.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  UserProfile: any;
  isLoginFormVisible: boolean = true;
  changeLogin() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
  constructor(private dialog: MatDialog, private router:Router, private fb:FormBuilder, private userService: UserService, private authService:AuthService, private store: Store<AppState>,) {
    this.loginForm = fb.group({
      loginEmail:['',[Validators.required, Validators.email]],
      loginPassword:['',[Validators.required,  Validators.minLength(5)]],
    })
    this.signupForm = fb.group({
      signupFullname:['', Validators.required],
      signupEmail:['',[Validators.required, Validators.email]],
      signupPassword:['',[Validators.required,  Validators.minLength(5)]],
    })
  }
  navigateToHome(){
    this.router.navigate(['/']);
  }
  submitLoginForm(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
      const data = localStorage.getItem("jwt");
      console.log(data)
      if (data !== "") this.router.navigateByUrl("/home");
    }
  }

  submitSignupForm(){
    if(this.signupForm.valid){
      this.authService.register(this.signupForm.value);
      console.log(this.signupForm.value);
      //  this.changeIslogin();
    }
  }

  HandleLogin() {
    this.dialog.open(AuthComponent, {

    })

  }

}



