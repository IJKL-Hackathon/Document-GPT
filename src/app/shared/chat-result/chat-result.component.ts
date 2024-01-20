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
  answers: any;
  UserProfile:any;
  sumData:any;
 
 selectedAnswers: number[] = [];

  constructor(private activatedRoute:ActivatedRoute,private featurService:FeaturService,
    private fileService:FileService, private userService:UserService,private store:Store<AppState>
    ){

  }
  ngOnInit(){
    // this.fileService.getFileId().subscribe((fileSelected) => {
    //   this.fileSelected = fileSelected;
    //   // Thực hiện các hành động khác khi fileSelected thay đổi
    // });
    // another-component.ts
      this.featurService.getData().subscribe((sumData) => {
        this.answers = sumData;
        console.log(sumData);
        
      });

   this.sumData=this.featurService.getStoredSumData();
    this.messages.push({ sender: 'Chat IJKL', content: 'Hello! How can I help you today?', className: 'message received' });
    console.log(this.param);
    this.store.pipe(select((store)=>store.user)).subscribe((user)=>{
    this.UserProfile=user.userProfile;
  
  });
 
};
receiveDataFromFeature(data: any) {
  console.log(data);
  
  this.answers = data;

 console.log("out put: ",this.answers);
 
  // Thực hiện các hành động khác dựa trên dữ liệu nhận được từ component con
}
sendMessage() {
  let fileId=this.fileService.getFileId();
  
  // console.log("a",this.UserProfile);
  
  if (this.userInput.trim() !== '') {
 
    this.messages.push({ sender: 'You', content: this.userInput, className: 'message sent' });

  
    this.featurService.getQA( fileId, this.UserProfile.id, this.userInput).subscribe(response => {
      console.log(response);
     
      this.messages.push({ sender: 'Chat IJKL', content: response.answer, className: 'message received' });
    });

  
    this.userInput = '';
  }
 
  }

checkAnswer:any;
updateSelectedAnswer(questionIndex: number, choiceIndex: number) {
  this.selectedAnswers[questionIndex] = choiceIndex;
}

// checkAnswers() {
//   for (let i = 0; i < this.answers.length; i++) {
//     const correctAnswerIndex = this.answers[i].answer;
//     console.log(this.selectedAnswers);
    
//     if (this.selectedAnswers[i] === correctAnswerIndex) {
//       this.checkAnswer=`Question ${i + 1}: Correct! Explanation: ${this.answers[i].explanation}`
//       console.log(`Question ${i + 1}: Correct! Explanation: ${this.answers[i].explanation}`);
//     } else {
//       // Đáp án sai, xử lý logic tương ứng
//       this.checkAnswer=`Question ${i + 1}: Incorrect! Explanation: ${this.answers[i].explanation}`
//       console.log(`Question ${i + 1}: Incorrect! Correct answer: ${correctAnswerIndex + 1}`);
//     }
//   }
// }
// Trong file .ts của component
// Trong file .ts của component
questionResults: string[] = [];

checkAnswers() {
  this.questionResults = []; // Đặt lại mảng trạng thái

  for (let i = 0; i < this.answers.length; i++) {
    const correctAnswerIndex = this.answers[i].answer;

    if (this.selectedAnswers[i] === correctAnswerIndex) {
      this.questionResults[i] = 'Correct';
    } else {
      this.questionResults[i] = 'Incorrect';
    }
  }
}


}


