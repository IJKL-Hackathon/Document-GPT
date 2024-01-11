import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-chat-result',
  templateUrl: './chat-result.component.html',
  styleUrls: ['./chat-result.component.scss']
})
export class ChatResultComponent {
  @Input() param: string = '';
  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit(){
  console.log(this.param);
  
};

}
