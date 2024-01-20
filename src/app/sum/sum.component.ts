import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.scss']
})
export class SumComponent {
  routePath: string = '';
  constructor(private activatedRoute:ActivatedRoute){

  }
  ngOnInit() {
    const routeSnapshot = this.activatedRoute.snapshot;
    this.routePath = routeSnapshot.url[0].path;


  }
}
