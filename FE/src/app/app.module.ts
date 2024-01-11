
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
    StoreModule.forRoot({auth:AuthReducer,user:UserReducer},{}),
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
