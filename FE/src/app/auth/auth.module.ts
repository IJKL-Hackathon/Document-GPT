import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
