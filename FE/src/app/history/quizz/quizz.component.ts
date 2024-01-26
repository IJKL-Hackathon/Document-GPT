import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HistoryService } from 'src/app/service/history.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent {
quizzHistory:any;
id:any;
  constructor(private historyService:HistoryService,  private activatedRoute: ActivatedRoute){}
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log(this.id);
    
    this.historyService.getQuizzShare(this.id).subscribe((res)=>{
      this.quizzHistory = res["questions"];
      console.log(this.quizzHistory);
      
    })
  }
  selectedAnswers: number[] = [];
  checkAnswer: any;
  updateSelectedAnswer(questionIndex: number, choiceIndex: number) {
    this.selectedAnswers[questionIndex] = choiceIndex;
  }
  questionResults: string[] = [];

  checkAnswers() {
    this.questionResults = []; // Đặt lại mảng trạng thái

    for (let i = 0; i < this.quizzHistory.length; i++) {
      const correctAnswerIndex = this.quizzHistory[i].answer;

      if (this.selectedAnswers[i] === correctAnswerIndex) {
        this.questionResults[i] = 'Correct';
      } else {
        this.questionResults[i] = 'Incorrect';
      }
    }
  }
}
