import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeaturService } from '../service/feature.service';
import { FileService } from '../state/file/file.service';
import { UserService } from '../state/user/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../models/AppState';
import { HistoryService } from '../service/history.service';
import { history } from 'src/Data/res_file';
import { MatDialog } from '@angular/material/dialog';
import { DialogShareComponent } from '../shared/dialog-share/dialog-share.component';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() param: string = '';
  answers: any;
  history:any;
  UserProfile:any;
  checkedId:string[]=[];
  constructor(private activatedRoute:ActivatedRoute,private historyService:HistoryService,
    private fileService:FileService, private userService:UserService,private store:Store<AppState>,
    private fetureService:FeaturService,private router:Router,private diaolog:MatDialog
    ){

  }
  ngOnInit() {
    if(localStorage.getItem("jwt"))
    {
      this.userService.getUserProfile();
    }
    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
      this.UserProfile=user.userProfile;
    
    });
    this.history=history;
  //  this.historyService.getHistory(this.UserProfile.id).subscribe((res)=>
  //   {
  //     this.history=res;
  //   });
    
  }
  onCheckboxChange(event: any, id: any) {
    if (event.target.checked) {
      // this.fileIdSelected=id;
      this.checkedId.push(id);
      // this.fileService.saveFileId(id);
      // this.fileService.updateSelectedFileIds(id, event.target.checked);
      console.log('Checkbox checked History with id:', this.checkedId);
    } else {
      this.checkedId= this.checkedId.filter(listId => listId!==id)
      console.log('Checkbox unchecked History with id:', id);
      // console.log('Checkbox checked History with id:', this.checkedId);
    }
  }
  testAgain(){

      this.historyService.testAgain(this.UserProfile.id,this.checkedId).subscribe((response)=>{
        console.log("Test Again", response["questions"]);
        
          this.historyService.setQuizzTestAgain(response["questions"]);
          this.router.navigate(["/history/quizz"]);
      })
  }
  Share(){
    this.historyService.share(this.UserProfile.id,this.checkedId).subscribe((response)=>{
      console.log(response["id"]);
      this.diaolog.open(DialogShareComponent,{
        // data: {id:1}
          data: {id:response["id"]}
     
      })
    });
    
  }
}
