
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA,NgModule} from '@angular/core'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavLeftComponent } from './shared/nav-left/nav-left.component';
import { ChatResultComponent } from './shared/chat-result/chat-result.component';
import { FormsModule } from '@angular/forms';
import { FeatureComponent } from './shared/feature/feature.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { SumComponent } from './sum/sum.component';
import { SharedComponent } from './shared/shared.component';
import { QuizizzComponent } from './quizizz/quizizz.component';
import { QaComponent } from './qa/qa.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';
import { AuthModule } from './auth/auth.module';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './state/auth/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { UserReducer } from './state/user/user.reducer';
import { FileReducer } from './state/file/file.reducer';
import { FeaturService } from './service/feature.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HistoryComponent } from './history/history.component';
import { QuizzComponent } from './history/quizz/quizz.component';
import { DialogShareComponent } from './shared/dialog-share/dialog-share.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DialogNotSelectedFileComponent } from './shared/dialog-not-selected-file/dialog-not-selected-file.component';
import { QuizzShareComponent } from './shared/quizz-share/quizz-share.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavLeftComponent,
    ChatResultComponent,
    FeatureComponent,
    SumComponent,
    SharedComponent,
    QuizizzComponent,
    QaComponent,
    HistoryComponent,
    QuizzComponent,
    DialogShareComponent,
    DialogNotSelectedFileComponent,
    QuizzShareComponent,
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    StoreModule.forRoot({auth:AuthReducer,user:UserReducer,file:FileReducer},{}),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DialogModule,
    ClipboardModule
    


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        FormsModule,
        MatMenuModule,
        MatButtonModule,
        RouterModule,
        MatDialogModule,
        StoreModule.forRoot({auth: AuthReducer, user: UserReducer, file: FileReducer}, {}),
        HttpClientModule,
        NgOptimizedImage

    ],
  providers: [FeaturService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
