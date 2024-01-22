import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FeaturService } from 'src/app/service/feature.service';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-quizz-share',
  templateUrl: './quizz-share.component.html',
  styleUrls: ['./quizz-share.component.scss']
})
export class QuizzShareComponent {
  routePath:any;
  idQuizz:any;
  selectedAnswers: number[] = [];
  answers:any;
  constructor( 
    private activatedRoute: ActivatedRoute, private featureService:FeaturService, private historyService: HistoryService
  ) {

  }
  ngOnInit() {
    const routeSnapshot = this.activatedRoute.snapshot;
    this.routePath = routeSnapshot.url[0].path;
    console.log(this.routePath);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.idQuizz=params['id'];
      console.log(params['id']);

    });
    console.log(this.idQuizz);
    this.historyService.getQuizzShare(this.idQuizz).subscribe(
      (response) => {
        console.log(this.idQuizz);
        console.log(this.featureService.getData());
      
        this.answers=this.featureService.setData(response["questions"]);
        // console.log('Quizizz Response:', response);
      },
      (error) => {
        // Xử lý lỗi khi gọi API
        console.error('API Error:', error);
      }
  )}

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
}
