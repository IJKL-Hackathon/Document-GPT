import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/state/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  @Input() changeIslogin:any;
  myform: FormGroup;
constructor(private router:Router, private fb:FormBuilder, private authService:AuthService) {
    this.myform = fb.group({
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required,  Validators.minLength(5)]],
    })
  }
  navigateToHome(){
    this.router.navigate(['/']);
  }
  submitForm(){
    if(this.myform.valid){
      this.authService.login(this.myform.value);
      console.log(this.myform.value);
      
    }
  }
}
