import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/app/models/AppState';
import { FeaturService } from 'src/app/service/feature.service';
import { FileService } from 'src/app/state/file/file.service';
import { UserService } from 'src/app/state/user/user.service';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-chat-result',
  templateUrl: './chat-result.component.html',
  styleUrls: ['./chat-result.component.scss']
})
export class ChatResultComponent {
  @Input() param: string = '';
  userInput: string = '';
  messages: { sender: string, content: string, className: string }[] = [];
  answer: any;
  UserProfile:any;

  constructor(private activatedRoute:ActivatedRoute,private featurService:FeaturService,
    private fileService:FileService, private userService:UserService,private store:Store<AppState>
    ){

  }
  ngOnInit(){
    this.messages.push({ sender: 'Chat IJKL', content: 'Hello! How can I help you today?', className: 'message received' });
  console.log(this.param);
  this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
    this.UserProfile=user.userProfile;
  
  });
 
};
receiveDataFromFeature(data: any) {
    this.answer = data;
  // Thực hiện các hành động khác dựa trên dữ liệu nhận được từ component con
}
sendMessage() {
  let fileId=this.fileService.getFileId();
  
  // console.log("a",this.UserProfile);
  
  if (this.userInput.trim() !== '') {
 
    this.messages.push({ sender: 'You', content: this.userInput, className: 'message sent' });

  
    this.featurService.getQA('qa', fileId, this.UserProfile.id, this.userInput).subscribe(response => {
      console.log(response);
     
      this.messages.push({ sender: 'Chat IJKL', content: response.answer, className: 'message received' });
    });

  
    this.userInput = '';
  }
 
  }
}


