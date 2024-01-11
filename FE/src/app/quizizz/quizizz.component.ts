import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quizizz',
  templateUrl: './quizizz.component.html',
  styleUrls: ['./quizizz.component.scss']
})
export class QuizizzComponent {
  routePath: string = '';
  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit() {
    const routeSnapshot = this.activatedRoute.snapshot;
    this.routePath = routeSnapshot.url[0].path;

  }
}
