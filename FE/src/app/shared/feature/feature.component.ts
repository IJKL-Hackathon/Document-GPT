import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AppState } from 'src/app/models/AppState';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { FileService } from 'src/app/state/file/file.service';
import { FeaturService } from 'src/app/service/feature.service';
import { DialogNotSelectedFileComponent } from '../dialog-not-selected-file/dialog-not-selected-file.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  UserProfile: any;
  answerData: any;
  query:any;
  clickedSum:boolean=false;
  clickedQa:boolean=false;
  clickedQuizz:boolean=false;
  select: string = 'sum'; // Initialize select property with a default value
  @Output() answer = new EventEmitter<any>();

  constructor(private diaolog:MatDialog, private userService:UserService,
    private store:Store<AppState>, private router:Router,
    private fileService:FileService,private featureService:FeaturService
    ) {

  }
  ngOnInit() {
    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.UserProfile=user.userProfile;

    });

   
  }

  navigateTo(option:string){
    if(!this.fileService.getFileId()){
      this.diaolog.open(DialogNotSelectedFileComponent,{
   
      })
    }
    else{
      let fileId = this.fileService.getFileId();
      // console.log("idfile:",this.fileService.getFileId());
      // console.log("idUser:",this.UserProfile.id);
      // console.log("option:",router);
      switch (option) {
        case 'sum':
          this.isClickedSum();
          console.log(this.clickedSum);
          
          this.featureService.getSummary(fileId,this.UserProfile.id).subscribe(
            (response) => {
              this.answerData = response["answer"];
              this.featureService.setStoreSumData(response["answer"]);
              console.log(this.featureService.getData());

              this.featureService.setData(response["answer"]);

              // console.log("data:",this.featureService.getStoredSumData());

              // this.sendAnswer(response["answer"]);
              console.log('Summary Response:', response["answer"]);
            },
            (error) => {
              // Xử lý lỗi khi gọi API
              console.error('API Error:', error);
            }
          );
          break;
        case 'qa':
          this.isClickedQa();
          break;
        case 'quizizz':

        this.isClickedQizz();
          this.featureService.getQuizizz(fileId,this.UserProfile.id).subscribe(
            (response) => {
              console.log(this.featureService.getData());

              this.featureService.setData(response["questions"]);
              // this.answerData = response["questions"];
              // this.sendAnswer(response["questions"]);
              // this.answer.emit(response["questions"]);
              console.log('Quizizz Response:', response);
            },
            (error) => {
              // Xử lý lỗi khi gọi API
              console.error('API Error:', error);
            }
          );
          break;
        default:
          console.warn('Unknown path:', option);
          break;
      }
      this.router.navigate(["/"+option]);
    }
  }

  sendAnswer(answerData:any){
    // console.log(answerData);

    this.answer.emit(answerData);
  }


  highlightButton(destination: string): void {
    this.select = destination;
  }
  isClickedSum(): boolean {
    this.clickedSum=true;
    this.clickedQa=false;
    this.clickedQuizz=false;
    return this.clickedSum;
  }
  isClickedQa(): boolean {
    this.clickedSum=false;
    this.clickedQa=true;
    this.clickedQuizz=false;
    return this.clickedQa;
  }
  isClickedQizz(): boolean {
    this.clickedSum=false;
    this.clickedQa=false;
    this.clickedQuizz=true;
    return this.clickedQuizz;
  }
}
