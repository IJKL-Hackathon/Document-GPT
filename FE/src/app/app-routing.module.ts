import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SumComponent } from './sum/sum.component';
import { QuizizzComponent } from './quizizz/quizizz.component';
import { QaComponent } from './qa/qa.component';

const routes: Routes = [
  {path: '', component:HomeComponent },
  {path: 'sum', component:SumComponent},
  {path: 'quizizz', component:QuizizzComponent},
  {path: 'qa', component:QaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
