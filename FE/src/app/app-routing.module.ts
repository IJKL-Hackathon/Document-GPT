import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SumComponent } from './sum/sum.component';
import { QuizizzComponent } from './quizizz/quizizz.component';
import { QaComponent } from './qa/qa.component';
import { HistoryComponent } from './history/history.component';
import { QuizzComponent } from './history/quizz/quizz.component';
import { QuizzShareComponent } from './shared/quizz-share/quizz-share.component';
import { AuthComponent } from "./auth/auth.component";



const routes: Routes = [
  {path: '', component:AuthComponent },
  {path: 'home', component:HomeComponent },
  
  {path: 'sum', component:SumComponent},
  {path: 'quizizz', component:QuizizzComponent},
  {path: 'qa', component:QaComponent},
   {path: 'history', component:HistoryComponent},
   {path: 'history/quizz', component:QuizzComponent},
   {path: 'share', component:QuizzShareComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }


