import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  sum: any;
  UserProfile: any;
  sumData: any;

  selectedAnswers: number[] = [];

  constructor(private activatedRoute: ActivatedRoute, private featurService: FeaturService,
    private fileService: FileService, private userService: UserService, private store: Store<AppState>,
    private cdr: ChangeDetectorRef, private router: Router
  ) {

  }
  ngOnInit() {
    // this.fileService.getFileId().subscribe((fileSelected) => {
    //   this.fileSelected = fileSelected;
    //   // Thực hiện các hành động khác khi fileSelected thay đổi
    // });
    // another-component.ts


    this.featurService.getStoredSumData().subscribe((sum: any) => {
      this.sumData = sum;
    });
    this.messages.push({ sender: 'Chat IJKL', content: 'Hello! How can I help you today?', className: 'message received' });
    console.log(this.param);
    this.store.pipe(select((store) => store.user)).subscribe((user) => {
      this.UserProfile = user.userProfile;

    });
    this.featurService.getData().subscribe((res) => {
      this.answers = res;
      // console.log(res);

    });

  };
  receiveDataFromFeature(data: any) {
    console.log(data);

    this.answers = data;

    console.log("out put: ", this.answers);

    // Thực hiện các hành động khác dựa trên dữ liệu nhận được từ component con
  }
  sendMessage() {
    let fileId = this.fileService.getFileId();

    // console.log("a",this.UserProfile);

    if (this.userInput.trim() !== '') {

      this.messages.push({ sender: 'You', content: this.userInput, className: 'message sent' });

    
      
      this.featurService.getQA(fileId, this.UserProfile.id, this.userInput).subscribe(response => {
        console.log(response);

        this.messages.push({ sender: 'Chat IJKL', content: response.answer, className: 'message received' });
      });


      this.userInput = '';
    }

  }

  checkAnswer: any;
  updateSelectedAnswer(questionIndex: number, choiceIndex: number) {
    this.selectedAnswers[questionIndex] = choiceIndex;
  }


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
  loadAddQuestion = false;
  addQuestion() {
    this.loadAddQuestion = true;
    let fileId = this.fileService.getFileId();

    // chỗ này nếu có api mới để gọi quizz khác thì sửa hàm getQuizz lại
    this.featurService.getQuizizz(fileId, this.UserProfile.id).subscribe(
      (response) => {

        this.answers = this.answers.concat(response['questions']);
        this.cdr.detectChanges();
        console.log(this.answers);
      },
      () => {
        // Xử lý lỗi nếu cần
      },
      () => {

        this.loadAddQuestion = false;
      }
    );
    console.log(this.answers);
  }
  routerHistory() {
    this.router.navigate(["/history"]);
  }
}


